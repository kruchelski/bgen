import PlaceholderContent from "@/components/PlaceholderContent";
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

  return shallowMount(PlaceholderContent, mountOptions);
};

describe('Tests PlaceholderContent render', () => {
  beforeEach(() => jest.clearAllMocks());

  it("should render it", () => {
    const wrapper = build();
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Tests fgStyle compute', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a gradient style', () => {
    const wrapper = build()
    const expected = `color: ${wrapper.vm.fgColor}`
    const actual = wrapper.vm.fgStyle
    expect(actual).toBe(expected)
  })
})

describe('Tests borderStyle compute', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return a gradient style', () => {
    const wrapper = build()
    const expected = `border: 1px solid ${wrapper.vm.fgColor}`
    const actual = wrapper.vm.borderStyle
    expect(actual).toBe(expected)
  })
})
