import DomPurify from 'dompurify';

const  sanitizeHTML = (html) => {
    if(!html) {
        return "";
    }
    return DomPurify.sanitize(html);
};

export default sanitizeHTML;