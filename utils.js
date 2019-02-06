const crypto = require('crypto');

exports.encrypt = text => {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(process.env.SECRET_KEY_ENCRYPT), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

exports.decrypt = text => {
    let textParts = text.split(':');
    let iv = new Buffer(textParts.shift(), 'hex');
    let encryptedText = new Buffer(textParts.join(';'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(process.env.SECRET_KEY_ENCRYPT), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};