import { WebComponent } from '@/types';

class SelectElement extends HTMLSelectElement {
  connectedCallback() {
    const currentSelectedOption = () => this.options[this.selectedIndex].value;
    this.style.position = 'absolute';
    this.style.left = '-10000px';
    this.style.top = '-10000px';
    this.setAttribute('aria-hidden', 'true');

    const select = document.createElement('div');
    select.classList.add('nk-select');

    const selectField = document.createElement('div');
    selectField.classList.add('nk-select-value');
    selectField.setAttribute('aria-labelledby', 'nk-select-label');
    selectField.setAttribute('tabindex', '0');
    selectField.textContent = currentSelectedOption();

    const options = Array.from(this.options).map((selectOption, index) => {
      const option = document.createElement('div');
      option.classList.add('nk-select-option');
      option.addEventListener('click', () => {
        this.selectedIndex = index;
      });

      const optionLabel = document.createElement('span');
      optionLabel.innerText = selectOption.label;

      option.appendChild(optionLabel);

      return option;
    });

    const removeAllHoverState = () => options.forEach(option => option.classList.remove('hover'));

    const optionsWrapper = document.createElement('div');
    optionsWrapper.classList.add('nk-select-options');
    optionsWrapper.style.display = 'none';

    const label = document.createElement('span');
    label.innerText = this.dataset.label || '';
    label.classList.add('nk-select-label');
    label.setAttribute('id', 'nk-select-label');

    const openSelect = () => {
      this.focus();
      removeAllHoverState();
      options[this.selectedIndex].classList.add('hover');
      optionsWrapper.style.display = 'initial';
    };

    const closeSelect = () => {
      optionsWrapper.style.display = 'none';
      selectField.textContent = currentSelectedOption();
    };

    selectField.addEventListener('click', openSelect);
    label.addEventListener('click', openSelect);

    this.addEventListener('change', () => {
      removeAllHoverState();
      options[this.selectedIndex].classList.add('hover');
      selectField.textContent = currentSelectedOption();
    });

    this.addEventListener('blur', removeAllHoverState);

    this.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      if (optionsWrapper.style.display === 'initial') {
        e.preventDefault();
        closeSelect();
        selectField.focus();
      } else if (optionsWrapper.style.display === 'none') {
        e.preventDefault();
        openSelect();
      }
    });

    selectField.addEventListener('keydown', e => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: e.key
      });
      this.dispatchEvent(event);
    });

    selectField.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        openSelect();
      }
    });

    this.parentNode?.insertBefore(select, this);
    select.appendChild(label);
    select.append(selectField);
    select.appendChild(optionsWrapper);
    options.forEach(option => optionsWrapper.appendChild(option));
  }
}

export const filterableSelectElement: WebComponent = ['nk-select', SelectElement, { extends: 'select' }];
