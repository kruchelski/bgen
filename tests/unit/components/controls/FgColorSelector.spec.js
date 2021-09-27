import FgColorSelector from '@/components/controls/FgColorSelector'
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueTilt from "vue-tilt.js";

const localVue = createLocalVue();
localVue.use(VueTilt);

const build = (testMount = {}) => {
  const { testData = null, testMethods = null } = testMount;
  let mountOptions = {};

  if (testData) {
    mountOptions = {
      sync: false,
      localVue,
      data() {
        return testData;
      }
    };
  } else {
    mountOptions = {
      sync: false,
      localVue
    };
  }

  if (testMethods) {
    mountOptions.methods = testMethods;
  }

  return shallowMount(FgColorSelector, mountOptions);
};

describe('Tests FgColorSelector render', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render it', () => {
    const wrapper = build();
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Tests shadowColor compute', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a box-shadow style', () => {
    const wrapper = build()
    const expected = `box-shadow: 0 0 20px ${wrapper.vm.color}`
    const actual = wrapper.vm.shadowColor
    expect(actual).toBe(expected)
  })
})

describe('Tests toggleForeground method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should invert the foreground value', () => {
    const options = {
      testData: {
        foreground: false
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.foreground).toBe(false)
    wrapper.vm.toggleForeground()
    expect(wrapper.vm.foreground).toBe(true)
  })

  it('should emit an event with foreground properties', () => {
    const wrapper = build()
    const expected = {
      entity: 'showForeGround',
      value: !wrapper.vm.foreground
    }
    wrapper.vm.toggleForeground()
    expect(wrapper.emitted(['state-update'])[0][0]).toEqual(expected)
  })
})

describe('Tests handleChange method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should emit an event with the fgColor properties', () => {
    const mockFgColor = '#565656'
    const wrapper = build()
    wrapper.setData({
      color: mockFgColor
    })
    const expected = {
      entity: 'fgColor',
      value: mockFgColor
    }
    wrapper.vm.handleChange('fgColor')
    expect(wrapper.emitted(['state-update'])[0][0]).toEqual(expected)
  })
})