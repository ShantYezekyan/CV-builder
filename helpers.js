export const tagSetValue = (tagId, value = '') => {
    document.getElementById(tagId).innerHTML = value;
}