<template>
  <div>
    <span :title="isLoading"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      pleaseWaitInstance: null
    };
  },
  mounted() {
    this.updatePleaseWait();
  },
  beforeUpdate() {
    this.updatePleaseWait();
  },
  methods: {
    updatePleaseWait() {
      if (this.isLoading) {
        this.pleaseWaitInstance = pleaseWait({
          logo: "",
          backgroundColor: "rgb(76, 94, 113, 0.7)",
          loadingHtml:
            '<div class="loader__wrap" role="alertdialog" aria-busy="false" aria-live="polite" aria-label="Loading…"><div class="loader" aria-hidden="true"><div class="loader__sq"></div><div class="loader__sq"></div></div></div>'
        });
      }
      if (!this.isLoading && this.pleaseWaitInstance != null) {
        this.pleaseWaitInstance.finish();
      }
    },
    updateLoading(isLoading) {
      this.$data.isLoading = isLoading;
    }
  },
  created() {
      const vm = this;
      vm.$bus.$on('isLoading:push', (isLoading) =>{
      vm.updateLoading(isLoading);
      })
    },
    beforeDestroy() {
      const vm = this;
      vm.$bus.$off('isLoading:push');
    },
};
</script>

<style>
loading-message {
  color: white;
}
</style>

<style lang="scss">
@mixin same-size($sz) {
  width: $sz;
  height: $sz;
}

// loader wrapper - can be used as a backdrop to obscure the rest of the page or given a transparent background/use hsla/rgba
.loader__wrap {
  position: fixed;
  left: 0;
  top: 0;
  @include same-size(100%);
  display: flex;
  z-index: 1; // fine for this demo
}

// container for animation
.loader {
  --sz: 7rem;
  width: calc(var(--sz) * 2);
  height: var(--sz);
  margin: auto; // centers along both main and cross axis in flex containers
  display: flex;
  justify-content: space-evenly;
}

// each half of the animation container
.loader__sq {
  // size of each loader piece circle/triangle;
  --p-sz: calc(var(--sz) / 4);
  // margin offset so each half of the container overlaps a bit
  --m-offset: calc((var(--p-sz) * -1) * 0.75);
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  height: 100%;
  width: 50%;

  &::before,
  &::after {
    @include same-size(var(--p-sz));
    content: "";
    position: relative;
    // transform is what's being animated
    transform: translateY(calc((var(--sz) - var(--p-sz)) * -1));

    animation: loader-box-bounce 0.5s cubic-bezier(0.3, 0.5, 0.4, 0.95)
      calc(var(--i) * 0.06s) infinite alternate-reverse;
  }

  &:first-of-type {
    margin-right: var(--m-offset);

    // first el animated and first visual element
    &::before {
      --i: 1;
      content: "🎲";
      font-size: 30px;
    }

    // second element visually; third el animated
    &::after {
      --i: 3;
      content: "🎉";
      font-size: 30px;
      // make the loader pieces triangles in supporting browsers
    }
  }

  &:nth-of-type(2) {
    // third element visually; 2nd el animated
    &::before {
      --i: 2;
      content: "🎲";
      font-size: 30px;
    }

    // fourth element visually, fourth el animated
    &::after {
      --i: 4;
      content: "🎉";
      font-size: 30px;

      @supports (clip-path: circle()) {
        border-radius: 0;
      }
    }
  }
}

@keyframes loader-box-bounce {
  to {
    transform: translateY(0);
  }
}

// general page styles

*,
*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>