var mainImage = document.querySelector('.mainImage img');
var button = document.querySelector('#data0');
var clickMeButton = document.querySelectorAll('.wheelPoint');
var lateClick = false;
var myInterval;
var myLateInterval;

for(i=0; i<clickMeButton.length; i++)
{
    clickMeButton[i].addEventListener('click', clickMe);
}

myStartInterval();
colorButton();

var pictures = [
    'pic0.png',
    'pic1.png',
    'pic2.png',
    'pic3.png'
];

var picId = 1;

function colorButton()
{
    clearColor();
    button.classList.add('wheelPointActive');
}

function clickMe(event)
{
    var haveClass = event.target.classList.contains('wheelPointActive');
    if (lateClick && haveClass)
    {
        mainImage.setAttribute('src', pictures[0]);
        button = document.querySelector('#data0');
        colorButton();
        event.target.classList.remove('wheelPointActive');
        tooLate();
    }
    else
    {
        var uniqueId = event.target.dataset.name;
        picId = uniqueId;
        mainImage.setAttribute('src', pictures[picId]);

        clearColor();
        myStopFunction();
        myStopLateFunction();

        event.target.classList.add('wheelPointActive');

        myStartInterval();
    }
}

function clearColor(){
    var selectAllElements = document.getElementsByClassName("wheelPointActive");

    for (i = 0; i < selectAllElements.length; i++) 
    {
        selectAllElements[i].classList.remove('wheelPointActive');
    }
}

function myStopFunction() {
    clearInterval(myInterval);
}

function myStopLateFunction() {
    clearInterval(myLateInterval);
}

function myStartInterval()
{
    myInterval = setInterval(function()
    {
        mainImage.setAttribute('src', pictures[picId]);
        button = document.querySelector('#data'+ picId);
        colorButton();
        picId++;

        if (picId > pictures.length-1)
        {
            picId=0;
        }
    },

    2000);

    myLateInterval = setInterval(function()
    {
        lateClick=true;
    },

    1500);
}

function tooLate()
{
    myStopFunction();
    myStopLateFunction();
    picId=0;
    lateClick=false;
    myStartInterval();
}