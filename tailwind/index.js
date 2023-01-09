const configs = require('./configs')
const plugin = require('tailwindcss/plugin')

const boxModel = (theme, { negative }) => ({
  auto: 'auto',
  ...configs.spacing,
  ...configs.widths,
  ...negative(configs.spacing),
})

const colors = theme => theme('colors');

const widthHeight = {
  half: '50%', full: '100%', auto: 'auto', 'screen': '100vh', 'fit-content': 'fit-content'
}

module.exports = {
  mode: 'jit',

  purge: configs.purge,

  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },

  theme: {
    fontSize: configs.spacing,
    fontFamily: configs.fontFamily,
    zIndex: configs.zIndex,
    colors: configs.colors,
    screens: configs.screens,
    borderRadius: configs.borderRadius,
    opacity: configs.opacity,
    stroke: colors,
    fill: colors,
    margin: boxModel,
    padding: boxModel,
    spacing: { ...configs.spacing },
    height: {
      ...configs.spacing,
      ...widthHeight
    },
    width: {
      ...configs.widths,
      ...configs.spacing,
      ...widthHeight
    }
  },

  extend: {
    borderWidth: {
      1: 1
    }
  },

  corePlugins: {
   container: false,
  },

  plugins: [
    plugin(function({ addUtilities, e }) {
      let variations = {}
      variations[`.u-fill-space`] = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      }

      addUtilities(variations, ['responsive'])
    }),
    plugin(function({ addUtilities }) {
      const variants = {
        l: {},
        r: {},
        t: {},
        b: {},
        x: {
          paddingLeft: {},
          paddingRight: {}
        },
        y: {
          paddingTop: {},
          paddingBottom: {}
        }
      }
      let variations = {}
      let firstProp, secondProp;
      const count = {
        0: '0',
        1: 'var(--contain)',
        2: 'calc(var(--contain) * 2)',
        3: 'calc(var(--contain) * 3)',
        4: 'calc(var(--contain) * 4)'
      }

      for (const key in count) {
        variations[`.contain-${key}`] = {
          padding: count[key]
        }
      }

      for (const prop in variants) {
        if (Object.hasOwnProperty.call(variants, prop)) {

          for (const key in count) {
            if (Object.hasOwnProperty.call(count, key)) {
              let className = `.contain-${prop.charAt(0)}-${key}`;
              variations[className] = {}

              const value = count[key];
              switch (prop) {
                case 'l':
                  firstProp = 'paddingLeft'
                  break;
                case 'r':
                  firstProp = 'paddingRight'
                  break;
                case 'x':
                  firstProp = 'paddingLeft'
                  secondProp = 'paddingRight'
                  break;
                case 'b':
                  firstProp = 'paddingBottom'
                  break;
                case 't':
                  firstProp = 'paddingTop'
                  break;
                case 'y':
                  firstProp = 'paddingBottom'
                  secondProp = 'paddingTop'
                  break;
              }

              variations[className][firstProp] = value
              if (secondProp) {
                variations[className][secondProp] = value
              }
            }
          }
        }
      }

      addUtilities(variations, ['responsive'])
    })
  ],
}
