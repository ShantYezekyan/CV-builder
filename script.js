

class CreateCVGenerator {
    constructor() {
        this.firstName =  '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = null;
        this.gender = '';
        this.social = [];
        this.aboutMe = '';
        this.skills = [];
        this.work = [
            {
                title: '',
                position: '',
                details: '',
                datePeriod: '',
            }
        ];
    };

    personalInfoChange(key, value) {
        this[key] = value;
    }

    addSkill() {

    }

    addWork() {

    }

    createCV() {
        
    }

}

const cv = new CreateCVGenerator();



document.getElementById('form').addEventListener('input', (e) => {
    const { value, name } = e.target;
    cv.personalInfoChange(name, value);
})

document.getElementById('render').onclick = () => {
    renderCV()
}




const renderCV = () => {
    document.getElementById('personalInfo').innerHTML = `
    <h2>${cv.firstName}</h2>
    <h2>${cv.lastName}</h2>
    `
    document.getElementById('personalInfo').innerHTML = ``

    if (cv.gender === 'male') {
        const myImg = document.createElement('img');
        myImg.setAttribute('src', './Images/man.jpg')
        document.body.appendChild(myImg);
    } else {
        console.log('female selected');
    }
    
}

