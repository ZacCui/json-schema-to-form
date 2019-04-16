const bmiReferenceProps = {
  id: "bmi",
  observationName: "BMI - Body mass index",
  dataElements: [
    {
      id: "name",
      displayName: "Name",
      type: "textInput",
      display: true,
      isRequired: true
    },
    {
      id: "gender",
      displayName: "Gender",
      type: "select",
      options: [
        {
          id: 1,
          name: "Male",
          isDefault: true,
          sortOrder: 1
        },
        {
          id: 2,
          name: "Female",
          isDefault: false,
          sortOrder: 2
        }
      ],
      display: true,
      isRequired: false
    },
    {
      id: "weight",
      displayName: "Weight",
      unitOfMeasure: "kg",
      type: "numberInput",
      bounds: {
        upperLimit: 1000
      },
      display: true,
      isRequired: true
    },
    {
      id: "height",
      displayName: "Height",
      unitOfMeasure: "cm",
      type: "numberInput",
      bounds: {
        upperLimit: 300
      },
      display: true,
      isRequired: true
    },
    {
      id: "bmi",
      displayName: "BMI",
      unitOfMeasure: "kg/m2",
      type: "numberInput",
      bounds: {
        upperLimit: 100
      },
      display: false,
      isRequired: false
    }
  ]
};

const headCircumferenceReferenceProps = {
  id: "head-circumference",
  observationName: "Head Circumference",
  dataElements: [
    {
      id: "name",
      displayName: "Name",
      type: "textInput",
      display: true,
      isRequired: true
    },
    {
      id: "gender",
      displayName: "Gender",
      type: "select",
      options: [
        {
          id: 1,
          name: "Male",
          isDefault: true,
          sortOrder: 1
        },
        {
          id: 2,
          name: "Female",
          isDefault: false,
          sortOrder: 2
        }
      ],
      display: true,
      isRequired: false
    },
    {
      id: "head-circumference",
      displayName: "Head Circumference",
      unitOfMeasure: "cm",
      type: "numberInput",
      bounds: {
        upperLimit: 1000
      },
      display: true,
      isRequired: true
    }
  ]
};

export { bmiReferenceProps, headCircumferenceReferenceProps };
