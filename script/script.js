window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

        function getZeroforDate(number) {
            if(number >= 0 && number < 10) {
                return "0" + number;
            }
            else {
                return number;
            }
        }

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
     
            timeRemaining = getZeroforDate((dateStop - dateNow) / 1000),
            seconds = getZeroforDate(Math.floor(timeRemaining % 60)),
            minutes = getZeroforDate(Math.floor((timeRemaining / 60) % 60)),
            hours = getZeroforDate(Math.floor(timeRemaining /60 / 60));
            
            return { timeRemaining, hours, minutes, seconds};   

        }


        function updateClock() {
            let timer = getTimeRemaining();
       
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if(timer.timeRemaining > 0) {
                setInterval(updateClock, 1000);
            }
            else{
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
           
        }
    
        updateClock();
    }

    countTimer('20 july 2019');

    //menu
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
            
        document.body.addEventListener('click',()=>{
            let target = event.target;
        
            if(target && target.closest('.menu')){
                menu.classList.add('active-menu');
            } 
            else if(target && (target.classList.contains('close-btn') || target.tagName === 'A') || !target.classList.contains('active-menu')) {
                menu.classList.remove('active-menu');
            }
            
        });
    };

    toggleMenu();
 

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach((elem)=> {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';

            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            }
            else {
                target = target.closest('.popup-content');

                if(!target) {
                    popup.style.display = 'none';
                }
            }
                
        })
    }

    togglePopUp();

    //табы
    
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
              tab = tabHeader.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
                if(index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }
                else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }

            }

        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');


            if(target) {
                tab.forEach((item,i) => {
                    if(item === target) {
                        toggleTabContent(i);
                    }
                });
                
            }
            
        });

    };

    tabs();

    //cлайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
        btn = document.querySelectorAll('.portfolio-btn'),
        //dot = document.querySelectorAll('.dot'),
        slider = document.querySelector('.portfolio-content'),
        containerDot = document.querySelector('.portfolio-dots');

    let dot;   
    let addDot = () => {
        for(let i = 0; i < slide.length; i++) {
            let dot;
            dot = document.createElement('li')
            dot.classList.add('dot');
            containerDot.appendChild(dot);  
            }

            dot = document.querySelectorAll('.dot');
    };
    
    addDot();
           
        let currentSlide = 0;
        let interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        }

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        }

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);

        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlide++;
            }
            else if(target.matches('#arrow-left')) {
                currentSlide--;
            }
            else if(target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if(currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        })

        startSlide(1500);

    }

    slider();

})
