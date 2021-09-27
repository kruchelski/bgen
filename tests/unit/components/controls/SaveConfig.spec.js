import SaveConfig from '@/components/controls/SaveConfig'
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueTilt from "vue-tilt.js";

const localVue = createLocalVue();
localVue.use(VueTilt);

const mockConfigs = [
  {
    name: 'test',
    id: 182
  }
]

const build = (testMount = {}) => {
  const { testData = null, testMethods = null, configType = 'default' } = testMount;
  let mountOptions = {};

  if (configType === 'invalid') {
    mountOptions = {
      sync: false,
      localVue
    }
  } else if (testData) {
    mountOptions = {
      sync: false,
      localVue,
      propsData: {
        configs: mockConfigs
      },
      data() {
        return testData;
      }
    };
  } else {
    mountOptions = {
      sync: false,
      localVue,
      propsData: {
        configs: mockConfigs
      }
    };
  }

  if (testMethods) {
    mountOptions.methods = testMethods;
  }

  return shallowMount(SaveConfig, mountOptions);
};

describe('Tests SaveConfig render', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render it', () => {
    const wrapper = build();
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Tests configs props default', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should assign an empty array to configs props if it is falsy', () => {
    const options = {
      configType: 'invalid'
    }
    const wrapper = build(options)
    expect(wrapper.vm.configs).toEqual([])
  })
})

describe('Tests errorState compute', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return false if hasError is false and configName is truthy', () => {
    const options = {
      testData: {
        hasError: false,
        configName: 'test'
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.errorState).toBe(false)
  })

  it('should return false if hasError is true and configName is truthy', () => {
    const options = {
      testData: {
        hasError: true,
        configName: 'test'
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.errorState).toBe(false)
  })

  it('should return false if hasError is false and configName is falsy', () => {
    const options = {
      testData: {
        hasError: false,
        configName: ''
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.errorState).toBe(false)
  })

  it('should return true if hasError is true and configName is falsy', () => {
    const options = {
      testData: {
        hasError: true,
        configName: ''
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.errorState).toBe(true)
  })
})

describe('Tests configExists compute', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return true if configId is truthy', () => {
    const options = {
      testData: {
        configId: 123
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.configExists).toBe(true)
  })

  it('should return fa;se if configId is falsy', () => {
    const options = {
      testData: {
        configId: null
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.configExists).toBe(false)
  })
})

describe('Tests configName watcher', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should assign the id from the element of configs array', async () => {
    const options = {
      testData: {
        configId: null,
        configName: ''
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.configId).toBeNull()
    wrapper.setData({
      configName: mockConfigs[0].name
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.configId).toBe(mockConfigs[0].id)
  })

  it('should assign null to configId', async () => {
    const options = {
      testData: {
        configId: 123,
        configName: 'someTestName'
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.configId).toBe(123)
    wrapper.setData({
      configName: 'otherName'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.configId).toBeNull()
  })
})

describe('Tests saveConfig method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should call configNameHasError', () => {
    const configNameHasError = jest.fn()
    const options = {
      testMethods: {
        configNameHasError
      }
    }
    const wrapper = build(options)
    wrapper.vm.saveConfig('test', 123)
    expect(configNameHasError).toBeCalledTimes(1)
  })

  it('should assign true to hasError and not emit an config-save event if configNameHasError returns true', () => {
    const configNameHasError = jest.fn().mockImplementationOnce(() => true)
    const options = {
      testData: {
        hasError: false
      },
      testMethods: {
        configNameHasError
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.hasError).toBe(false)
    wrapper.vm.saveConfig('', 182)
    expect(wrapper.vm.hasError).toBe(true)
    expect(wrapper.emitted(['config-save'])).toBeFalsy()
  })

  it('should assign false to hasError and emit an event if configNameHasError returns false', () => {
    const mockEvent = {
      name: 'testEventName',
      id: 999
    }
    const options = {
      testData: {
        hasError: true
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.hasError).toBe(true)
    wrapper.vm.saveConfig(mockEvent.name, mockEvent.id)
    expect(wrapper.vm.hasError).toBe(false)
    expect(wrapper.emitted('config-save')[0][0]).toEqual(mockEvent)
  })

  it('should reset the values after emitting the config-save event', () => {
    const mockEvent = {
      name: 'testEventName',
      id: 999
    }
    const options = {
      testData: {
        hasError: true,
        configId: 234,
        configName: 'test'
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.hasError).toBe(true)
    expect(wrapper.vm.configId).toBe(234)
    expect(wrapper.vm.configName).toBe('test')
    wrapper.vm.saveConfig(mockEvent.name, mockEvent.id)
    expect(wrapper.vm.hasError).toBe(false)
    expect(wrapper.vm.configId).toBeNull()
    expect(wrapper.vm.configName).toBe('')
  })
})

describe('Tests configNameHasError method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return true if provided name is empty', () => {
    const wrapper = build()
    const actual = wrapper.vm.configNameHasError('')
    expect(actual).toBe(true)
  })

  it('should return fase if provided name is not empty', () => {
    const wrapper = build()
    const actual = wrapper.vm.configNameHasError('test')
    expect(actual).toBe(false)
  })
})