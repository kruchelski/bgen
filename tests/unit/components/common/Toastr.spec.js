import Toastr from '@/components/common/Toastr'
import EventBus from '@/utils/EventBus'
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueTilt from "vue-tilt.js";

const localVue = createLocalVue();
localVue.use(VueTilt)

const mockToastrs = [
  {
    id: 123,
    title: 'Test toastr',
    body: 'Body of the test toastr',
    type: 'success'
  }
]

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

  return shallowMount(Toastr, mountOptions);
};

describe('Tests Toastr render', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render it', () => {
    const options = {
      testData : {
        toastrs: mockToastrs
      }
    }
    const wrapper = build(options);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call $on from EventBus when component is created', () => {
    const spyOn = jest.spyOn(EventBus, '$on')
    const options = {
      testData : {
        toastrs: mockToastrs
      }
    }
    build(options);
    expect(spyOn).toBeCalledTimes(1)
  })
});

describe('Tests addToastr method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should add a toastr to the toastrs array', () => {
    const mockToastrsArray = [
      {
        id: 123,
        title: 'Test title',
        body: 'Test body',
        type: 'success'
      }
    ]

    const mockToastr = {
      title: 'Test title 2',
      body: 'Test body 2',
      type: 'success'
    }

    const options = {
      testData: {
        toastrs: mockToastrsArray
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.toastrs.length).toBe(1)
    wrapper.vm.addToastr(mockToastr)
    expect(wrapper.vm.toastrs.length).toBe(2)
  })
})

describe('Tests removeToastr method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should remove an item from the toastrs array', () => {
    const mockToastrsArray = [
      {
        id: 321,
        title: 'Test title',
        bogy: 'Test body',
        type: 'success'
      }
    ]
    const options = {
      testData: {
        toastrs: mockToastrsArray
      }
    }
    const wrapper = build(options)
    expect(wrapper.vm.toastrs.length).toBe(1)
    wrapper.vm.removeToastr(mockToastrsArray[0].id)
    expect(wrapper.vm.toastrs.length).toBe(0)
  })
})

describe('Tests getAtualPostition method', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a style corresponding to the provided index', () => {
    const mockIndex = 2
    const wrapper = build()
    const expected = `top: ${4 + (mockIndex * 5.5) + (0.5 * mockIndex)}rem`
    const actual = wrapper.vm.getActualPosition(mockIndex)
    expect(actual).toBe(expected)
  })
})
