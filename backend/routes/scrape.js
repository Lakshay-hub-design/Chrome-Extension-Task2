const express = require("express")
const router = express.Router()

const scrapeLinkedin = require("../scrappers/linkedin")
const scrapeInstagram = require("../scrappers/instagram")

const LinkedinProfile = require("../models/linkedinProfile")
const InstagramProfile = require("../models/instagramProfile")

function isValidLinkedin(data) {
  return data && data.name && data.name.length > 0
}

function isValidInstagram(data) {
  return data && data.username && data.username.length > 0
}


function detectPlatform(url) {
    if(url.includes("linkedin.com/in/")) return "linkedin"
    if(url.includes("instagram.com/")) return "instagram"
    return null
}

router.post("/", async (req, res) =>{
    const {url, html} = req.body
    
    if (!url || !html) {
        return res.status(400).json({ success: false, message: "Url and Html are required" })
    }

    const platform = detectPlatform(url)
    
    if(!platform){
        return res.status(400).json({ success: false, message: "Unsupported platform"})
    }

    try {
        let data
        
        if(platform === "linkedin"){
            data = scrapeLinkedin(html)
            if (!isValidLinkedin(data)) {
                return res.status(400).json({ success: false, message: "Invalid LinkedIn profile data"})
            }
            await LinkedinProfile.create(data)
        } else if(platform === "instagram"){
            data = scrapeInstagram(html)
            if (!isValidInstagram(data)) {
                return res.status(400).json({ success: false, message: "Invalid Instagram profile data" })
            }            
            await InstagramProfile.create(data)
        };
        console.log("Platform:", platform)
        console.log("Extracted data:", {
            name: data.name || data.username,
            followers: data.followers || data.follower_count,
        })
        
        return res.status(200).json({ 
            success: true,
            message: "Page processed successfully", 
            platform, 
            data 
        })
    } catch (error) {  
        return res.status(500).json({ success: false, message: "Scraping failed on backend"})
    }
})

module.exports = router