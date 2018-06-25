store = {
  customers: [
    {
      id: 1,
      company: "Company Name",
      name: "firstName",
      lastName: "lastName",
      personType: 1,
      email: "person@gmail.com",
      phoneNumbers: ["11 567 6787", "11 456 7898"],
      addresses: [
        {
          id: 1,
          street: "",
          number: 1234,
          zipcode: "",
          city: "",
          province: "",
          country: ""
        },
        {
          id: 2,
          street: "",
          number: 1234,
          zipcode: "",
          city: "",
          province: "",
          country: ""
        }
      ],
      orders: [
        {
          orderId: 1,
          date: Date.now(),
          deliverTo: 1,
          items: [
            {
              id: 1,
              description: "Acolchados de 1 Plaza",
              price: 259,
              tax: 0.21,
              discount: 0,
              quantity: 25,
              attributes: [
                {
                  name: "Color",
                  value: "Liso"
                },
                {
                  name: "Tamano",
                  value: "1 Plaza"
                },
                {
                  name: "Bolsa",
                  value: "Poliuretano"
                }
              ]
            },
            {
              id: 2,
              description: "Cortina Fidelna de Tropical",
              price: 239,
              tax: 0.21,
              discount: 0,
              quantity: 100,
              attributes: [
                {
                  name: "Color",
                  value: "Verde Manzana"
                },
                {
                  name: "Tela",
                  value: "Tropical Mecanico"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
