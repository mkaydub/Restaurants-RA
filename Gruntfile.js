responsive_images: {
    dev: {
      options: {
        sizes: [{
            width: 800,
            quality: 85,
            rename: false
          },
          {
            name: 'small',
            width: 570,
            quality: 85
          }
        ]
      },
      files: [{
        expand: true,
        cwd: 'src/images/',
        src: ['*.{jpg,png}'],
        dest: 'img/'
      }]
    }
  },
  watch: {
    dev: {
      files: ['src/images/*.{jpg,png}'],
      tasks: ['responsive_images']
    }
  }