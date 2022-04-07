export const createInputElement = (elToAppend, name, type, placeholder) => {
    const el = document.createElement('input');
    el.setAttribute('name', name);
    if (placeholder) {
        el.setAttribute('placeholder', placeholder)
    }
    el.setAttribute('type', type)
    elToAppend.appendChild(el)
}

export const createTextAreaElement = (elToAppend, name) => {
    const el = document.createElement('textarea');
    el.setAttribute('name', name);
    el.setAttribute('placeholder', name)
    el.setAttribute('rows', 10)
    el.setAttribute('cols', 30)
    elToAppend.appendChild(el)
}

export const createSkillRangeInput = (elToAppend, name, type) => {
    const el = document.createElement('input');
    el.setAttribute('name', name);
    el.setAttribute('type', type)
    el.setAttribute('list', 'tickmarks')
    el.setAttribute('step', 5)
    elToAppend.appendChild(el)

    const datalist = document.createElement('datalist');
    datalist.setAttribute('id', 'tickmarks')
    
    for(let i = 0; i < 10; i++) {
        const option = document.createElement('option')
        option.setAttribute('value', i*10)
        datalist.appendChild(option)
    }
   
    elToAppend.appendChild(datalist);
}

export const createTagElement = (tagName, className, elToAppend, content) => {
    const tag = document.createElement(tagName);
    tag.setAttribute('class', className);
    if (content) {
        tag.innerText = content;
    }
    
    elToAppend.appendChild(tag)
    return tag;
}