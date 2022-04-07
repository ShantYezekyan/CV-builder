import { 
    createInputElement,
    createTextAreaElement,
    createSkillRangeInput,
    createTagElement,
} from './helpers.js'

class CreateCVGenerator {
    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.address = '';
        this.phoneNumber = null;
        this.aboutMe = '';
        this.gender = '';
        this.social = {
            facebook: '',
            instagram: '',
            linkedin: ''
        };
        this.skills = [];
        this.work = [];
            
    }

    personalInfoChange(key, value) {
        this[key] = value;
    }

    addSocial(key, value) {
        this.social[key] = value;
    }


    addSkill(key, value) {

    }

    addWork(key, value) {

    }

};


const cv = new CreateCVGenerator()



// ------------------------ Add and Render Personal Info----------------------------------

document.getElementById('form').addEventListener('input', (e) => {
    const { value, name } = e.target;
    cv.personalInfoChange(name, value);
    renderPersonalInfo()
    if (cv.gender === 'male') {
        const myImg = document.getElementById('myAvatar');
        myImg.setAttribute('src', './Images/man.jpg')
    } else if (cv.gender === 'female') {
        const myImg = document.getElementById('myAvatar');
        myImg.setAttribute('src', './Images/woman.jpg')
    }

})

const renderPersonalInfo = () => {
    document.getElementById('fullName').innerHTML = `${cv.firstName} ${cv.lastName}`;
    document.getElementById('aboutMe_container').innerHTML = `<p>${cv.aboutMe}</p>`;
    document.getElementById('contactInfo').innerHTML = `<a href="tel:${cv.phoneNumber}">${cv.phoneNumber}</a>
   <a href="mailto:${cv.email}">${cv.email}</a>
   <p>${cv.address}</p>`

}


document.getElementById('socialForm').addEventListener('input', (e) => {
    const { value, name } = e.target;
    cv.addSocial(name, value);
    renderSocial()

})

const renderSocial = () => {
    const fb = cv.social.facebook;
    const ig = cv.social.instagram;
    const lk = cv.social.linkedin;
    document.getElementById('socialInfo').innerHTML = `<a href="https://www.facebook.com/${fb}">${fb}</a>
    <a href="https://www.instagram.com/${ig}">${ig}</a>
    <a href="https://www.linkedin.com/${lk}">${lk}</a>`;

}

document.getElementById('testCv').onclick = function () {
    console.log(cv.skills);
}

// -----------------------------------------------------------------------------



const addWorkData = (workId) => {

    const workData = cv.work.find(obj => obj.id === workId)

    const workBlock = document.getElementById(workId)
    workBlock.querySelector('.companyName').innerText = workData.title;
    workBlock.querySelector('.positionName').innerText = workData.position;
    workBlock.querySelector('.jobTimePeriod').innerText = workData.jobStart + ' - ' + workData.jobEnd;
    workBlock.querySelector('.workDetails').innerText = workData.jobDetails;
}


const addSkillData = (skillId) => {

    const skillData = cv.skills.find(obj => obj.id === skillId)

    const skillBlock = document.getElementById(skillId)
    skillBlock.querySelector('.skillName').innerText = skillData.skillName;
    skillBlock.querySelector('.skillBar_Fill').style.width = skillData.level + '%';
}


const cvEventListener = (cvKey, newId, renderData) => (e) => {
    const { value, name } = e.target;

    cv[cvKey] = cv[cvKey].map(cvValue => {
        if (cvValue.id === newId) {
            return { ...cvValue, [name]: value }
        }

        return cvValue;
    })

    
    
    if (renderData === 'addWork') {
        addWorkData(newId);
    } else if (renderData === 'addSkill') {
        addSkillData(newId);
    }

}


const createWorkBlock = (id) => {
    const container = document.getElementById('work_container')
    const workBlock = createTagElement('div', 'workBlock', container);
    workBlock.setAttribute('id', id)
    const header = createTagElement('div', 'workBlockTitle', workBlock);
    const companyName = createTagElement('h3', 'companyName', header, 'test')
    const positionName = createTagElement('h4', 'positionName', header)
    const jobTimePeriod = createTagElement('p', 'jobTimePeriod', header)
    const workDetauls = createTagElement('p', 'workDetails', workBlock)
}

const renderWork = function () {
    const element = document.createElement('form')
    createInputElement(element, 'title', 'text', 'Company Name')
    createInputElement(element, 'position', 'text', 'Job Position')
    createInputElement(element, 'jobStart', 'date')
    createInputElement(element, 'jobEnd', 'date')
    createTextAreaElement(element, 'jobDetails')
    document.getElementById('workFormSection').appendChild(element)

    const newId = Math.random().toString()
    const newWork = { id: newId }
    cv.work.push(newWork)


    element.addEventListener('input', cvEventListener('work', newId, 'addWork'))
    
    createWorkBlock(newId)
    

}

renderWork()




document.getElementById('addWork').onclick = renderWork





const createSkillBlock = (id) => {
    const container = document.getElementById('skills_container');
    const skillBlock = createTagElement('div', 'skillBlock', container);
    skillBlock.setAttribute('id', id)
    createTagElement('h3', 'skillName', skillBlock);
    const skillBar = createTagElement('div', 'skillBar', skillBlock);
    createTagElement('div', 'skillBar_Fill', skillBar);
}



const renderSkill = () => {
    const element = document.createElement('form')
    createInputElement(element, 'skillName', 'text', 'Skill Name')
    createSkillRangeInput(element, 'level', 'range')
    document.getElementById('skillFormSection').appendChild(element)

    const newId = Math.random().toString()
    const newSkill = { id: newId }
    cv.skills.push(newSkill)

    element.addEventListener('input', cvEventListener('skills', newId, 'addSkill'))
    
    createSkillBlock(newId)
}

renderSkill()


document.getElementById('addSkills').onclick = renderSkill






// add viber whatsapp icons to phone
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aut est, recusandae non tempora totam ea maxime, reprehenderit ducimus inventore placeat possimus ipsum nemo dolorem velit architecto provident debitis. Quam.


// fetch('https://fakeface.rest/face/json')
//         .then(resp => {
//             return resp.json();
//         })
        
//         // .catch((resp) => {
            
//         // };


// document.querySelector('.skillBar_Fill').style.width = '60%'