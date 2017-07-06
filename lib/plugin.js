const { resolve } = require('path')

var contentData

if (process.SERVER_BUILD) {
  contentData = require('@nuxtjs/content/lib/content.js').getContent()
}


const getContent = (requestedDir) => {
  const content = contentData[resolve('/', requestedDir)]

  return {
    get (path) {
      const keys = Object.keys(content)
      for (let i = 0; i < keys.length; i++) {
        const pageData = content[keys[i]].data
        if (pageData.permalink === path) return pageData
      }
    },

    getAll () {
      return Object.keys(content).map(key => content[key].data)
    }
  }
}


export default (context) => {
  context.app.$content = getContent
}