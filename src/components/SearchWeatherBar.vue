<template>
  <transition
    enter-active-class="bar-enter-active"
    leave-active-class="bar-leave-active"
  >
    <div v-show="show" class="search-container">
      <div class="container">
        <div class="close-bar">
          <button @click="handleClose">
            <img src="../assets/icons/close-white-18dp.svg" alt="Close" />
          </button>
        </div>
        <div class="search-bar">
          <div :class="{ focused: isInputFocused }">
            <span>
              <img src="../assets/icons/search-black-18dp.svg" alt="" />
            </span>
            <input
              type="text"
              placeholder="Enter a Location"
              @focus="handleInputFocus"
              @blur="handleInputBlur"
            />
          </div>
          <button>Search</button>
        </div>
        <ul class="locations">
          <li role="button">
            <span>London</span>
            <img
              src="../assets/icons/keyboard_arrow_right-black-18dp.svg"
              alt=""
            />
          </li>
          <li role="button">
            <span>São Paulo</span>
            <img
              src="../assets/icons/keyboard_arrow_right-black-18dp.svg"
              alt=""
            />
          </li>
          <li role="button">
            <span>Rio de Janeiro</span>
            <img
              src="../assets/icons/keyboard_arrow_right-black-18dp.svg"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: ['show'],
  emits: ['on-close'],
})
export default class extends Vue {
  show!: boolean;

  isInputFocused = false;

  handleClose(e: Event) {
    this.$emit('on-close', e);
  }

  handleInputFocus() {
    this.isInputFocused = true;
  }

  handleInputBlur() {
    this.isInputFocused = false;
  }
}
</script>

<style scoped>
.search-container {
  background-color: var(--primary);
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100%;
}

.container {
  position: relative;
  width: 90%;
  margin: auto;
}

.bar-enter-active {
  animation: slide-in 0.3s ease-in-out forwards;
}

.bar-leave-active {
  animation: slide-out 0.3s ease-in-out forwards;
}

.close-bar {
  text-align: right;
  padding: 10px 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.close-bar button {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  transition: all 0.3s ease-in-out;
}

.close-bar button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.search-bar {
  width: 100%;
  display: flex;
}

.search-bar div {
  width: 75%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border: 1px solid #e7e7eb;
  transition: all 0.3s ease-in-out;
}

.search-bar div.focused {
  box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.2);
}

.search-bar span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  min-width: 35px;
}

.search-bar input {
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 12px 0;
  font-size: 1em;
  color: #e7e7eb;
  flex-shrink: 1;
}

.search-bar button {
  border: none;
  outline: none;
  font-size: 1em;
  background: #3c47e9;
  border: 1px solid #3c47e9;
  color: #fff;
  cursor: pointer;
  padding: 12px 0;
  width: 23%;
  margin-left: 2%;
  transition: all 0.3s ease-in-out;
}

.search-bar button:hover {
  background: #3640d1;
  border: 1px solid #3640d1;
}

.search-bar button:focus {
  box-shadow: 0px 0px 1px 3px #3c48e954;
}

.search-bar input::placeholder {
  color: #616475;
}

.locations {
  list-style: none;
  margin-top: 35px;
}

.locations li {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  color: var(--secondary);
  border: 1px solid transparent;
  cursor: pointer;
}

.locations img {
  display: none;
}

.locations li:hover {
  border: 1px solid #616475;
}

.locations li:hover img {
  display: block;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translate(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translate(-100%);
  }
}

@media (min-width: 768px) {
  .search-container {
    width: var(--leftbar-side);
    position: fixed;
  }
  .close-bar {
    text-align: right;
    padding: 15px 20px;
  }
}

@media (min-height: 768px) {
  .close-bar {
    padding: 15px 20px;
  }
}
</style>
