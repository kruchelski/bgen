import BackgroundMain from "@/components/BackgroundMain";
import PlaceholderContent from "@/components/PlaceholderContent";
import Controls from "@/components/Controls";
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

  return shallowMount(BackgroundMain, mountOptions);
};

describe('Tests BackgorundMain render', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render it', () => {
    const mockBgColor = '#ffffff'
    const generateColor = jest.fn().mockImplementation(() => mockBgColor)
    const options = {
      testMethods: {
        generateColor
      }
    }
    const wrapper = build(options);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render PlaceholderContent component', () => {
    const wrapper = build()
    const childPlaceholderContent = wrapper.findComponent(PlaceholderContent)
    expect(childPlaceholderContent.exists()).toBe(true)
  })

  it('should render Controls component', () => {
    const wrapper = build()
    const childControls = wrapper.findComponent(Controls)
    expect(childControls.exists()).toBe(true)
  })

  it('should call init when component is created', () => {
    const init = jest.fn()
    const options = {
      testMethods: {
        init
      }
    }
    build(options)
    expect(init).toBeCalledTimes(1)
  })
});

describe('Tests bgStyle compute', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a gradient style', () => {
    const mockBgColor = '#ffffff'
    const generateColor = jest.fn().mockImplementation(() => mockBgColor)
    const options = {
      testData: {
        gradient: true
      },
      testMethods: {
        generateColor
      }
    }
    const wrapper = build(options)
    const expected = `background: linear-gradient(to right, ${mockBgColor}, ${mockBgColor})`
    const actual = wrapper.vm.bgStyle
    expect(actual).toBe(expected)
  })

  it('should return a solid style', () => {
    const mockBgColor = '#ffffff'
    const generateColor = jest.fn().mockImplementation(() => mockBgColor)
    const options = {
      testData: {
        gradient: false
      },
      testMethods: {
        generateColor
      }
    }
    const wrapper = build(options)
    const expected = `background-color: ${mockBgColor}`
    const actual = wrapper.vm.bgStyle
    expect(actual).toBe(expected)
  })
})

describe('Tests init method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should call generateColor two times', () => {
    const generateColor = jest.fn()
    const options = {
      testMethods: {
        generateColor
      }
    }
    const wrapper = build(options)
    wrapper.vm.init()
    expect(generateColor).toBeCalledTimes(4)
  })
})

describe('Tests generateColor method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a hexadecimal string less than or equal to #ffffff', () => {
    const wrapper = build()
    const actual = wrapper.vm.generateColor() <= '#ffffff'
    expect(actual).toBe(true)
  })
})

describe('Tests randomHexaDecimal', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a hexadecimal string less than or equal to #ffffff', () => {
    const wrapper = build()
    const actual = wrapper.vm.randomHexaDecimal(255.99) <= 'ff'
    expect(actual).toBe(true)
  })
})

describe('Tests generateBackgroundClass method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a string representing a gradient background', () => {
    const mockBgColor1 = '#ffffff'
    const mockBgColor2 = '#333333'
    const wrapper = build()
    const expected = `background: linear-gradient(to right, ${mockBgColor1}, ${mockBgColor2})`
    const actual = wrapper.vm.generateBackgroundClass(true, mockBgColor1, mockBgColor2)
    expect(actual).toBe(expected)
  })

  it('should return a string representing a solid background', () => {
    const mockBgColor1 = '#ffffff'
    const mockBgColor2 = '#333333'
    const wrapper = build()
    const expected = `background-color: ${mockBgColor1}`
    const actual = wrapper.vm.generateBackgroundClass(false, mockBgColor1, mockBgColor2)
    expect(actual).toBe(expected)
  })
})

describe('Tests handleStateUpdate method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should assign the values from the updatedState to the correct property', () => {
    const options = {
      testData: {
        gradient: false
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.gradient).toBe(false)
    const mockState = {
      entity: 'gradient',
      value: true
    }
    wrapper.vm.handleStateUpdate(mockState)
    expect(wrapper.vm.gradient).toBe(true)
  })

  it('should do nothing if one of the properties from the update state is null', () => {
    const options = {
      testData: {
        gradient: false
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.gradient).toBe(false)
    const mockState = {
      entity: null,
      value: true
    }
    wrapper.vm.handleStateUpdate(mockState)
    expect(wrapper.vm.gradient).toBe(false)
  })
})

describe('Tests handleConfigSave method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should call console.log two times', () => {
    const spyLog = jest.spyOn(console, 'log')
    const wrapper = build()
    const mockConfig = 'testConfig'
    wrapper.vm.handleConfigSave(mockConfig)
    expect(spyLog).toBeCalledTimes(2)

  })
})
