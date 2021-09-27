import Controls from "@/components/controls/Controls";
import BgColorSelector from '@/components/controls/BgColorSelector'
import FgColorSelector from '@/components/controls/FgColorSelector'
import SaveConfig from '@/components/controls/SaveConfig'
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

  return shallowMount(Controls, mountOptions);
};

describe('Tests Controls render', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render it', () => {
    const wrapper = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render BgColorSelector component', () => {
    const wrapper = build()
    const childPlaceholderContent = wrapper.findComponent(BgColorSelector)
    expect(childPlaceholderContent.exists()).toBe(true)
  })

  it('should render FgColorSelector component', () => {
    const wrapper = build()
    const childControls = wrapper.findComponent(FgColorSelector)
    expect(childControls.exists()).toBe(true)
  })

  it('should render SaveConfig component', () => {
    const wrapper = build()
    const childControls = wrapper.findComponent(SaveConfig)
    expect(childControls.exists()).toBe(true)
  })
});

describe('Tests handleStateUpdate', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should emit an state-update event with the provided data', () => {
    const mockState = {
      entity: 'testEntity',
      value: 'testValue'
    }
    const wrapper = build()
    wrapper.vm.handleStateUpdate(mockState)
    expect(wrapper.emitted(['state-update'])[0][0]).toEqual(mockState)
  })
})

describe('Tests handleConfigSave', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should emit an config-save event with the provided data', () => {
    const mockConfig = {
      name: 'testName',
      id: 123
    }
    const wrapper = build()
    wrapper.vm.handleConfigSave(mockConfig)
    expect(wrapper.emitted(['config-save'])[0][0]).toEqual(mockConfig)
  })
})