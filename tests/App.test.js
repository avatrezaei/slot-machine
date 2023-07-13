import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  test('starts with 10 credits', () => {
    const wrapper = mount(App);
    expect(wrapper.vm.credits).toBe(10);
  });

  test('spin method decreases credits by 1', async () => {
    const wrapper = mount(App);
    await wrapper.vm.spin();
    expect(wrapper.vm.credits).toBe(9);
  });

  // Other tests...
});
