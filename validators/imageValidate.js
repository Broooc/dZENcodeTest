const sharp = require('sharp')
const { MaximumImageHeight, MaximumImageWidth } = require('../constants')

async function ImageValidation(image) {
    const sharpImage = sharp(image)

    let metadata = await sharpImage.metadata()

    let isResized = false;

    if (metadata.width > MaximumImageWidth && !isResized) {
        isResized = true
        sharpImage.resize({width: 320, height: null})
    }

    if (metadata.height > MaximumImageHeight && !isResized) {
        isResized = true
        sharpImage.resize({height: 240, width: null})
    }

    metadata = await sharpImage.metadata()

    return {sharpImage: (await sharpImage.toBuffer()), metadata}
}


module.exports = { ImageValidation }