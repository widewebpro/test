import screens from '../../tailwind/configs/screens'
import { emToPx } from './_helpers';

export default class {
  constructor() {
    const purgeClasses = 'xxs:inline-block xxs:hidden xs:inline-block xs:hidden sm:inline-block sm:hidden md:inline-block md:hidden lg:inline-block lg:hidden xl:inline-block xl:hidden xxl:inline-block xxl:hidden';
    const purge = document.createElement('DIV')
    purge.setAttribute('class', purgeClasses)

    const screensDiv = document.createElement('DIV')
    screensDiv.setAttribute('class', 'fixed z-10 bottom-0 right-0 p-5 px-10 bg-black text-white rounded text-12 cursor-default opacity-25 hover:opacity-100')

    let size,
      firstVal,
      secondVal,
      nextSize,
      sizeDIV = [];
    let i = 0;
    let objSize = Object.keys(screens).length - 1;

    for (const key in Array.prototype.reverse.call(screens)) {
      if (Object.hasOwnProperty.call(screens, key)) {
        size = key;

        i++;
        nextSize = Object.keys(screens)[i];

        firstVal = size ? `${size}:inline-block` : '';
        secondVal = nextSize ? `${nextSize}:hidden` : '';

        sizeDIV[key] = document.createElement('DIV')
        sizeDIV[key].setAttribute('class', `hidden ${firstVal} ${secondVal}`)

        let next = nextSize ? ' - ' + screens[nextSize] + ` (${emToPx(screens[nextSize])}px)` : '';
        let prefix = ''

        if(i == objSize + 1) {
          next = ''
          prefix = '>= '
        }

        if(i == 1) {
          next = ''
          prefix = '<= '
        }

        sizeDIV[key].innerText = `${key}: ${prefix}${screens[key]} (${emToPx(screens[key])}px)${next}`

        screensDiv.append(sizeDIV[key])
      }
    }

    document.body.append(screensDiv)
  }
}

// xxs:inline-block xxs:hidden xs:inline-block xs:hidden sm:inline-block sm:hidden md:inline-block md:hidden lg:inline-block lg:hidden xl:inline-block xl:hidden xxl:inline-block xxl:hidden
