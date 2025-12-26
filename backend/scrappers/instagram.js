const cheerio = require("cheerio")

// NOTE: Instagram DOM is highly dynamic.
// Scraper relies on visible header structure and fails gracefully.
module.exports = function scrapeInstagram(html) {
  const $ = cheerio.load(html)

  const username = $("header h2").first().text().trim() || null

  const section = $("header section.x98rzlu.xeuugli").first()
  const containerDiv = section.children("div").first()
  const rowDivs = containerDiv.children("div")

  const display_name = rowDivs.eq(1).find("span").first().text().trim() || null

  const getCountByLabel = (label) => {
    let val = null

    $("header span").each((_, el) => {
      const text = $(el).text().toLowerCase().trim()

      if (text.endsWith(label) && !val) {
        const num = $(el)
          .find("span.html-span")
          .first()
          .text()
          .trim()

        if (num) val = parseInt(num.replace(/[^0-9]/g, ""), 10)
      }
    })

    return val
  }
  
  const posts = getCountByLabel("posts")
  const followers = getCountByLabel("followers")
  const following = getCountByLabel("following")

  const getBio = () =>{
    const bioSection = $("header section.xqui205").first()
    const outerDiv = bioSection.children("div").first()
    const innerDiv = outerDiv.children("div").first()

    const bioSpan = innerDiv.find('span').first()
    return bioSpan.first().text().trim() || null
  }
  
  const bio = getBio()

  return {
    username,
    display_name,
    posts,
    followers,
    following,
    bio
  }
}