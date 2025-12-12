import DomPurify from 'dompurify';

export const sanitizeHTML = (html) => {
    if(!html) {
        return "";
    }
    return DomPurify.sanitize(html);
};