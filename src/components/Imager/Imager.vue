<template>
  <div class="crop">
    <slot name="title"></slot>
    <vue-croppie
      ref=croppieRef
      :enableOrientation="true"
      :enforceBoundary="false"
      :enableResize="false"
      @result="result"
      @update="update"
      :boundary="{
        width: 600,
        height: 370,
      }"
      :viewport="{
        width: 200,
        height: 200,
        type: 'circle'
      }"
    />
    <!-- <img :src="cropped"> -->
    <div class="buttonBlock">
      <slot name="submit"></slot>
      <slot name="cancel"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: 'http://i.imgur.com/Fq2DMeH.jpg'
    },
    title: {
      type: String,
      default: 'Выберите область, которая будет отображаться на вашем фото профиля'
    }
  },
  watch: {
    imgUrl() {
      this.$refs.croppieRef.bind({
        url: this.imgUrl
      })
    }
  },
  name: 'crop',
  mounted() {
    this.$refs.croppieRef.bind({
      url: this.imgUrl
    })
  },
  data: () =>
    ({
      cropped: null
    }),
  methods: {
    crop() {
      const options = {
        format: 'jpeg',
        circle: false
      }
      this.$refs.croppieRef.result(options, output => {
        this.cropped = output
        this.$emit('uploadAvatar', output)
      })
    },
    result(output) {
      this.cropped = output
    },
    rotate(rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle)
    }
  }
}
</script>

<style>
  .crop {
    width: 100%;
    text-align: center;
  }
  .crop h3 {
    font-family: OpenSans;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.54;
    letter-spacing: normal;
    text-align: center;
    color: #787878;
  }
  .croppie-container
  .cr-viewport,
  .croppie-container
  .cr-resizer {
    border: none;
    box-shadow: 0 0 2000px 2000px rgba(212, 212, 212, 0.61);
  }
  .buttonBlock {
    display: flex;
    width: 100%;
    justify-content: space-around;
    position: relative;
    top: -36px;
  }
  .cr-slider {
    z-index: 9999;
    position: relative;
  }
  input[type=range] {
    -webkit-appearance: none;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    cursor: pointer;
    animate: 0.2s;
    border: 0.2px solid #010101;
    background: #d8d8d8;
  }
  input[type=range]::-webkit-slider-thumb {
    background-color: #3c7099;
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
  }
  input[type=range]::-moz-range-thumb {
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background-color: #3c7099;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
  }
  input[type=range]::-ms-fill-upper {
  }
  input[type=range]::-ms-thumb {
    background: #ffffff;
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
  }
  input[type=range]:focus::-ms-fill-upper {
  }

</style>
