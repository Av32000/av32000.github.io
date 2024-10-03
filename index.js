// Header Anim

const background = document.getElementById('header');
const disk = document.getElementById('disk');

const diskPos = {
	x: 0,
	y: 0,
};

const mouse = {
	x: 0,
	y: 0,
};

background.addEventListener('mousemove', e => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

function lerp(a, b, t) {
	return (1 - t) * a + t * b;
}

const raf = () => {
	diskPos.x = lerp(diskPos.x, mouse.x - disk.clientWidth / 2, 0.03);
	diskPos.y = lerp(diskPos.y, mouse.y - disk.clientHeight / 2, 0.03);

	disk.style.left = diskPos.x + 'px';
	disk.style.top = diskPos.y + 'px';
	requestAnimationFrame(raf);
};

if (screen.width > 900) raf();

// History Anim

const inViewport = (entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) entry.target.classList.add('is-inViewport');
	});
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
	Obs.observe(EL, obsOptions);
});

// Skills Anim
let currentSelectedIndex = 0;
let skillCount = document.querySelectorAll('.skills-icons img').length;
const anglePerSkill = 360 / skillCount;
let currentRotation = 0;
let currentSkill = document.querySelectorAll('.skills-icons img')[currentSelectedIndex].alt;

var intervalID = null;

function intervalManager(flag) {
	if (flag)
		intervalID = setInterval(() => {
			if (currentSkill != null) {
				document.querySelector('.' + currentSkill).classList.remove('fade-in');
			}

			currentSkill = document.querySelectorAll('.skills-icons img')[currentSelectedIndex].alt;
			UpdateColors();
			let content = document.querySelector('.' + currentSkill);
			content.classList.add('fade-in');

			if (currentSelectedIndex == document.querySelectorAll('.skills-icons img').length - 1)
				currentSelectedIndex = 0;
			else currentSelectedIndex++;

			rotateToSkill(currentSelectedIndex);
		}, 8000);
	else clearInterval(intervalID);
}

let timeout;

document.querySelectorAll('.skills-icons img').forEach((element, index) => {
	element.addEventListener('click', () => {
		intervalManager(false);
		if (timeout != null) clearTimeout(timeout);
		if (currentSkill != null) {
			document.querySelector('.' + currentSkill).classList.remove('fade-in');
		}
		currentSkill = element.alt;
		UpdateColors();
		rotateToSkill(index + 1);
		currentSelectedIndex = index;
		let content = document.querySelector('.' + currentSkill);
		content.classList.add('fade-in');

		timeout = setTimeout(() => {
			intervalManager(true);
		}, 3000);
	});
});

function rotateToSkill(skillNumber) {
	applyOSMessage();
	const wheel = document.getElementById('skills-icons');
	let targetAngle = (skillNumber - 1) * anglePerSkill;

	if (window.innerWidth < 900) {
		targetAngle -= 90;
	}

	let rotationDiff = targetAngle - currentRotation;
	if (Math.abs(rotationDiff) > 180) {
		rotationDiff = rotationDiff > 0 ? rotationDiff - 360 : rotationDiff + 360;
	}

	currentRotation += rotationDiff;
	currentRotation %= 360;

	wheel.style.transform = `rotate(${-currentRotation}deg)`;

	const icons = wheel.querySelectorAll('.skill img');
	icons.forEach(icon => {
		icon.style.transform = `rotate(${currentRotation}deg)`;
	});
}

function UpdateColors() {
	document.querySelectorAll('.skills-icons img').forEach(element => {
		if (element.alt == currentSkill) element.src = `./src/${currentSkill}-Selected.svg`;
		else element.src = `./src/${element.alt}.svg`;
	});
}

// Platoform EasterEgg
// https://stackoverflow.com/a/38241481/18031156
function getOS() {
	const userAgent = window.navigator.userAgent,
		platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
		macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'];
	let os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac OS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (/Linux/.test(platform)) {
		os = 'Linux';
	}

	return os;
}

function applyOSMessage() {
	const span = document.getElementById('os-message');
	if (!span) return;

	switch (getOS()) {
		case 'Windows':
			span.innerText = 'I see you 👀 windows user';
			break;
		case 'Linux':
			span.innerText = 'Hi fellow Linux User 🤗 !';
			break;
		case 'Mac OS':
			span.innerText = "You're on MacOS ! Why ?";
			break;

		default:
			break;
	}
}

intervalManager(true);
rotateToSkill(1);
