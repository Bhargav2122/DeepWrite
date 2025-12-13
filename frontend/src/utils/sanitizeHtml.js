import DomPurify from 'dompurify';

export default sanitizeHTML = (html) => {
    if(!html) {
        return "";
    }
    return DomPurify.sanitize(html);
};