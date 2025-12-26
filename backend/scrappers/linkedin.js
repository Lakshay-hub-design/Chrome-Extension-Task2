const cheerio = require("cheerio")

// Scraper is designed to fail gracefully and return null for missing fields.
module.exports = function scrapeLinkedin(html){
    const $ = cheerio.load(html)
    
    const getText = (selector) => {
      const text = $(selector).first().text().trim()
      return text || null
    }

    const name = getText("h1")
    const headline = getText(".text-body-medium")
    const location = getText(".text-body-small.inline")

    let about = null
    const aboutSection = $("#about").find("span[aria-hidden='true']").first()
    if (aboutSection.length) {
        about = aboutSection.text().trim()
    }

    let follower_count = null
    let connection_count = null

    $("li.text-body-small").each((_, el) => {
    const text = $(el).text().toLowerCase()

    if (text.includes("followers")) {
      follower_count = parseInt(text.replace(/[^0-9]/g, ""), 10)
    }

    if (text.includes("connections")) {
      connection_count = parseInt(text.replace(/[^0-9]/g, ""), 10)
    }
  });

  return {
    name,
    headline,
    location,
    about,
    follower_count,
    connection_count
  }
}