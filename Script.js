//Declearing the variables
let songIndex = 0;
let audioElement = new Audio('/Asset/Songs/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Sanam Re", filePath: "Asset/Songs/1.mp3", coverPath: "Asset/Cover/1.jpg"},
    {songName: "Pan ko Pat", filePath: "Asset/Songs/2.mp3", coverPath: "Asset/Cover/2.jpg"},
    {songName: "Sannani", filePath: "Asset/Songs/3.mp3", coverPath: "Asset/Cover/3.jpg"},
    {songName: "Baglung Bazzar", filePath: "Asset/Songs/4.mp3", coverPath: "Asset/Cover/4.jpg"},
    {songName: "Rani ghataii ma", filePath: "Asset/Songs/5.mp3", coverPath: "Asset/Cover/5.jpg"},
    {songName: "Gorkha Paltan", filePath: "Asset/Songs/6.mp3", coverPath: "Asset/Cover/6.jpg"},
]

//Handling the cover and songs name as in the array above
songItem.forEach((element,i) =>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('span')[0].innerHTML = songs[i].songName;
})


//Play the audio
masterPlay.addEventListener('click', ()=>{

    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();       
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');  
        gif.style.opacity = 0;

    }
});

//Handling progress bar along with the song

audioElement.addEventListener('timeupdate', ()=>{
    let audioProgress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = audioProgress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100);
})


//Handling the individual play pause button 
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');    
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click',(event)=>{
        makeAllPlays();
        songIndex = parseInt(event.target.id);
        event.target.classList.remove('fa-circle-play');
        event.target.classList.add('fa-circle-pause');
        audioElement.src = (`/Asset/Songs/${songIndex+1}.mp3`);
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');  
    })
})


//Handling the master play previous and master play next button
document.getElementById('masterPrevious').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = (`/Asset/Songs/${songIndex+1}.mp3`);
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
});
document.getElementById('masterNext').addEventListener('click',()=>{
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = (`/Asset/Songs/${songIndex+1}.mp3`);
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
    makeAllPlays();
});
