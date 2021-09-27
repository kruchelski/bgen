import BgColorSelector from '@/components/controls/BgColorSelector'
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

  return shallowMount(BgColorSelector, mountOptions);
};

describe('Tests BgColorSelector render', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render it', () => {
    const wrapper = build();
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Tests shadowColor1 compute', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a box-shadow style', () => {
    const wrapper = build()
    const expected = `box-shadow: 0 0 20px ${wrapper.vm.color1}`
    const actual = wrapper.vm.shadowColor1
    expect(actual).toBe(expected)
  })
})

describe('Tests shadowColor2 compute', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a box-shadow style', () => {
    const wrapper = build()
    const expected = `box-shadow: 0 0 20px ${wrapper.vm.color2}`
    const actual = wrapper.vm.shadowColor2
    expect(actual).toBe(expected)
  })
})

describe('Tests toggleGradient method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should invert the isGradient value', () => {
    const options = {
      testData: {
        isGradient: false
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.isGradient).toBe(false)
    wrapper.vm.toggleGradient()
    expect(wrapper.vm.isGradient).toBe(true)
  })

  it('should emit an event with gradient properties', () => {
    const wrapper = build()
    const expected = {
      entity: 'gradient',
      value: !wrapper.vm.isGradient
    }
    wrapper.vm.toggleGradient()
    expect(wrapper.emitted(['state-update'])[0][0]).toEqual(expected)
  })
})

describe('Tests handleChange method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should emit an event with the bgColor1 properties', () => {
    const mockBgColor = '#343434'
    const wrapper = build()
    wrapper.setData({
      color1: mockBgColor
    })
    const expected = {
      entity: 'bgColor1',
      value: mockBgColor
    }
    wrapper.vm.handleChange('bgColor1')
    expect(wrapper.emitted(['state-update'])[0][0]).toEqual(expected)
  })

  it('should emit an event with the bgColor2 properties', () => {
    const mockBgColor = '#565656'
    const wrapper = build()
    wrapper.setData({
      color2: mockBgColor
    })
    const expected = {
      entity: 'bgColor2',
      value: mockBgColor
    }
    wrapper.vm.handleChange('bgColor2')
    expect(wrapper.emitted(['state-update'])[0][0]).toEqual(expected)
  })
})