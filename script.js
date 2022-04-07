import { 
    createInputElement,
    createTextAreaElement,
    createSkillRangeInput,
    createTagElement,
} from './helpers.js'

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aut est, recusandae non tempora totam ea maxime'; 

class CreateCVGenerator {
    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.address = '';
        this.phoneNumber = '';
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

};


const cv = new CreateCVGenerator()



// ------------------------ Add and Render Personal Info----------------------------------

document.getElementById('personalInfoForm').addEventListener('input', (e) => {
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
    const fullName = document.getElementById('fullName');
    const aboutMe = document.getElementById('aboutMe_container')
    const email = document.querySelector('.emailInfo');
    const phone = document.querySelector('.phoneInfo');
    const address = document.querySelector('.addressInfo');
    
    
    cv.firstName === '' && cv.lastName === '' ? fullName.innerText = 'John Doe' : fullName.innerText = cv.firstName + ' ' + cv.lastName;
    cv.aboutMe === '' ? aboutMe.innerText = lorem : aboutMe.innerText = cv.aboutMe; 
    cv.address === '' ? address.innerText = 'Address' : address.innerText = cv.address;
    cv.phoneNumber === '' ? phone.innerText = 'Phone Number' : phone.innerText = cv.phoneNumber, phone.setAttribute('href', `tel:${cv.phoneNumber}`);
    cv.email === '' ? email.innerText = 'E-mail' : email.innerText = cv.email, email.setAttribute('href', `mailto:${cv.email}`);
    

}
renderPersonalInfo()

document.getElementById('socialForm').addEventListener('input', (e) => {
    const { value, name } = e.target;
    cv.addSocial(name, value);
    renderSocial()

})

const renderSocial = () => {
    const fbField = document.querySelector('.fb_Id')
    const igField = document.querySelector('.ig_Id')
    const lkField = document.querySelector('.lk_Id')
    const fb = cv.social.facebook;
    const ig = cv.social.instagram;
    const lk = cv.social.linkedin;

    fb === '' ? fbField.innerText = 'Facebook ID' : fbField.innerText = fb, fbField.setAttribute('href', `https://www.facebook.com/${fb}`)
    ig === '' ? igField.innerText = 'Instagram ID' : igField.innerText = ig, igField.setAttribute('href', `https://www.instagram.com/${ig}`)
    lk === '' ? lkField.innerText = 'LinkedIn ID' : lkField.innerText = ig, lkField.setAttribute('href', `https://www.linkedin.com/${lk}`)
}

document.getElementById('testCv').onclick = function () {
    console.log(cv);
}

// -----------------------------------------------------------------------------



const addWorkData = (workId) => {
    const workData = cv.work.find(obj => obj.id === workId)

    const workBlock = document.getElementById(workId)
    const name = workBlock.querySelector('.companyName');
    const position = workBlock.querySelector('.positionName');
    const startDate = workBlock.querySelector('.jobStart')
    const endDate = workBlock.querySelector('.jobEnd')
    const details = workBlock.querySelector('.workDetails');

    workData.title === '' ? name.innerText = 'Company Name' : name.innerText = workData.title
    workData.position === '' ? position.innerText = 'Position' : position.innerText = workData.position
    workData.jobDetails === '' ? details.innerText = lorem : details.innerText = workData.jobDetails
    workData.jobStart === '' ? startDate.innerText = 'Start Date -' : startDate.innerText = `${workData.jobStart} -`;
    workData.jobEnd === '' ? endDate.innerText = ' Current' : endDate.innerText = ` ${workData.jobEnd}`;
}


const addSkillData = (skillId) => {
    const skillData = cv.skills.find(obj => obj.id === skillId)

    const skillBlock = document.getElementById(skillId)
    const name = skillBlock.querySelector('.skillName');
    const level = skillBlock.querySelector('.skillBar_Fill')
    skillData.skillName === '' ? name.innerText = 'Your Skill' : name.innerText = skillData.skillName
    skillData.level === '' ? level.style.width = '50%' : level.style.width = skillData.level + '%'

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
    const workBlockHeader = createTagElement('div', 'workBlockTitle', workBlock);
    const workNamePosition = createTagElement('div', 'compName-Position', workBlockHeader)
    createTagElement('h3', 'companyName', workNamePosition, 'Company Name')
    createTagElement('h4', 'positionName', workNamePosition, 'Position')
    const timePeriod = createTagElement('div', 'jobTimePeriod', workBlockHeader)
    createTagElement('span', 'jobStart', timePeriod, 'Start Date -')
    createTagElement('span', 'jobEnd', timePeriod, ' Current')
    createTagElement('p', 'workDetails', workBlock, lorem)
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
    const newWork = { 
                        id: newId,
                        title: '',
                        position: '',
                        jobStart: '',
                        jobEnd: '',  
                        jobDetails: ''
                    }
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
    createTagElement('h3', 'skillName', skillBlock, 'Your Skill');
    const skillBar = createTagElement('div', 'skillBar', skillBlock);
    createTagElement('div', 'skillBar_Fill', skillBar);
}



const renderSkill = () => {
    const element = document.createElement('form')
    createInputElement(element, 'skillName', 'text', 'Skill Name')
    createSkillRangeInput(element, 'level', 'range')
    document.getElementById('skillFormSection').appendChild(element)

    const newId = Math.random().toString()
    const newSkill = { 
                        id: newId,
                        skillName: '',
                        level: 50 
                    };
    cv.skills.push(newSkill);

    element.addEventListener('input', cvEventListener('skills', newId, 'addSkill'));
    
    createSkillBlock(newId);
}

renderSkill();


document.getElementById('addSkills').onclick = renderSkill;






// add viber whatsapp icons to phone
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aut est, recusandae non tempora totam ea maxime, reprehenderit ducimus inventore placeat possimus ipsum nemo dolorem velit architecto provident debitis. Quam.


// fetch('https://fakeface.rest/face/json')
//         .then(resp => {
//             return resp.json();
//         })
        
//         // .catch((resp) => {
            
//         // };

