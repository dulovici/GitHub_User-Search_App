
(function() {
    'use strict'
    
    // DOM ELLEMENTS
    const body = document.querySelector('body');
    const home = document.querySelector('.home');
    const theme = document.querySelector('.theme-api');
    const searchInput = document.querySelector('.src-input');
    const searchBtn = document.querySelector('.src-btn');
    const err = document.querySelector('.error')
    
    const user = document.querySelector('.username');
    const url = document.querySelector('.link');
    const joinDate = document.querySelector('.join-date');
    const info = document.querySelector('.info');
    const avatar = document.querySelector('.avatar')
    
    const reposNum = document.querySelector('.repos');
    const followersNum = document.querySelector('.followers');
    const followingNum = document.querySelector('.following');
    
    const city = document.querySelector('.location');
    const link = document.querySelector('.website');
    const twitter = document.querySelector('.twitter');
    const company = document.querySelector('.company');
    
    // FUNCTIONS
    function makeRequest() {
        searchInput.value ? err.classList.remove('throw') : err.classList.add('throw')
        getData(searchInput.value)
        searchInput.value = null;
    }
    
    function getData(username) {
        fetch(`https://api.github.com/users/${username}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(data => {
            const userData = data;
            userData.message === 'Not Found' ? null : renderData(userData)
        })
        .catch(error => console.log(error))
    }
    
    function renderData(data) {
        user.textContent = data.login;
        url.textContent = `@${data.login}`;
        info.textContent = data.bio ? data.bio : `This profile has no bio`;
        joinDate.textContent = `Joined ${data.created_at.slice(0,10)}`;
    
        avatar.setAttribute('src', data.avatar_url)
        reposNum.textContent = data.public_repos;
        followersNum.textContent = data.followers;
        followingNum.textContent = data.following
    
        city.textContent = data.location ? data.location : `Not Available`;
        link.textContent = data.html_url.slice(8, data.html_url.length);
        twitter.textContent = data.twitter_username ? data.twitter_username : `Not Available`;
        company.textContent = data.company ? data.company : `Not Available`;
    }
    
    function themeSwap() {
        if(body.classList[0] === 'dark') {
            theme.lastElementChild.src = './assets/icon-moon.svg';
            theme.firstElementChild.textContent = 'DARK';
            body.classList.remove('dark')
        } else {
            theme.lastElementChild.src = './assets/icon-sun.svg';
            theme.firstElementChild.textContent = 'LIGHT';
            body.classList.add('dark')
        }
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error('You need to type username first 😅');
        }
        return response;
    }
    
    
    
    // EVENTS
    theme.addEventListener('click', themeSwap);

    searchBtn.addEventListener('click', makeRequest);

    window.addEventListener('keyup', e => {
        e.key === `Enter` && searchInput === document.activeElement
        ? makeRequest()
        : null
    });

    home.addEventListener('click', e=> {
        location.reload();
    });

})();