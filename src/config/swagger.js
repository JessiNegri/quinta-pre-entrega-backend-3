import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",

        info: {
            title: "ShipNow API",
            version: "1.0.0",
            description:
                "API para la gestión de usuarios, tiendas, pedidos y entregas de ShipNow. Incluye endpoints de mocking y herramientas de validación del sistema de logging."
        },

        servers: [
            {
                url: "http://localhost:8080",
                description: "Servidor local"
            }
        ],

        tags: [
            {
                name: "Users",
                description: "Gestión de usuarios"
            },
            {
                name: "Stores",
                description: "Gestión de tiendas"
            },
            {
                name: "Orders",
                description: "Gestión de pedidos"
            },
            {
                name: "Deliveries",
                description: "Gestión de entregas"
            },
            {
                name: "Mocks",
                description: "Generación y carga de datos de prueba"
            },
            {
                name: "Logger",
                description: "Herramientas de validación del sistema de logging"
            }
        ],

        components: {
            schemas: {

                // ==========================================
                // USER
                // ==========================================

                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        firstName: {
                            type: "string",
                            example: "Daniela"
                        },
                        lastName: {
                            type: "string",
                            example: "Ponce"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "daniela@gmail.com"
                        },
                        role: {
                            type: "string",
                            enum: [
                                "admin",
                                "customer",
                                "store",
                                "driver"
                            ],
                            example: "customer"
                        },
                        documents: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: []
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                UserInput: {
                    type: "object",
                    required: [
                        "firstName",
                        "lastName",
                        "email",
                        "password"
                    ],
                    properties: {
                        firstName: {
                            type: "string",
                            example: "Daniela"
                        },
                        lastName: {
                            type: "string",
                            example: "Ponce"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "daniela@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "mypassword"
                        },
                        role: {
                            type: "string",
                            enum: [
                                "admin",
                                "customer",
                                "store",
                                "driver"
                            ],
                            example: "customer"
                        },
                        documents: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: []
                        }
                    }
                },

                UsersResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Lista de usuarios"
                        },
                        payload: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },

                UserResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Usuario obtenido correctamente"
                        },
                        payload: {
                            $ref: "#/components/schemas/User"
                        }
                    }
                },

                // ==========================================
                // STORE
                // ==========================================

                Store: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        name: {
                            type: "string",
                            example: "Tienda Central"
                        },
                        address: {
                            type: "string",
                            example: "Av. Siempre Viva 123"
                        },
                        owner: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        isActive: {
                            type: "boolean",
                            example: true
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                StoreInput: {
                    type: "object",
                    required: [
                        "name",
                        "address",
                        "owner"
                    ],
                    properties: {
                        name: {
                            type: "string",
                            example: "Tienda Central"
                        },
                        address: {
                            type: "string",
                            example: "Av. Siempre Viva 123"
                        },
                        owner: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        isActive: {
                            type: "boolean",
                            example: true
                        }
                    }
                },

                StoresResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Lista de tiendas"
                        },
                        payload: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Store"
                            }
                        }
                    }
                },

                StoreResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Tienda obtenida correctamente"
                        },
                        payload: {
                            $ref: "#/components/schemas/Store"
                        }
                    }
                },

                // ==========================================
                // ORDER ITEM
                // ==========================================

                OrderItem: {
                    type: "object",
                    required: [
                        "name",
                        "quantity",
                        "price"
                    ],
                    properties: {
                        name: {
                            type: "string",
                            example: "Caja mediana"
                        },
                        quantity: {
                            type: "number",
                            example: 2
                        },
                        price: {
                            type: "number",
                            example: 1500
                        }
                    }
                },

                // ==========================================
                // ORDER
                // ==========================================

                Order: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        customer: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        store: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        items: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/OrderItem"
                            }
                        },
                        deliveryAddress: {
                            type: "string",
                            example: "Calle Falsa 456"
                        },
                        total: {
                            type: "number",
                            example: 3000
                        },
                        status: {
                            type: "string",
                            enum: [
                                "created",
                                "assigned",
                                "picked_up",
                                "in_transit",
                                "delivered",
                                "cancelled"
                            ],
                            example: "created"
                        },
                        priority: {
                            type: "string",
                            enum: [
                                "low",
                                "normal",
                                "high"
                            ],
                            example: "normal"
                        },
                        proof: {
                            nullable: true,
                            example: null
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                OrderInput: {
                    type: "object",
                    required: [
                        "customer",
                        "store",
                        "items",
                        "deliveryAddress"
                    ],
                    properties: {
                        customer: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        store: {
                            type: "string",
                            example: "6a46646de068d46fc6bbda5a"
                        },
                        items: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/OrderItem"
                            }
                        },
                        deliveryAddress: {
                            type: "string",
                            example: "Calle Falsa 456"
                        },
                        priority: {
                            type: "string",
                            enum: [
                                "low",
                                "normal",
                                "high"
                            ],
                            example: "normal"
                        }
                    }
                },

                OrderStatusInput: {
                    type: "object",
                    required: [
                        "status"
                    ],
                    properties: {
                        status: {
                            type: "string",
                            enum: [
                                "created",
                                "assigned",
                                "picked_up",
                                "in_transit",
                                "delivered",
                                "cancelled"
                            ],
                            example: "assigned"
                        }
                    }
                },

                OrdersResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Lista de pedidos"
                        },
                        payload: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Order"
                            }
                        }
                    }
                },

                OrderResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Pedido obtenido correctamente"
                        },
                        payload: {
                            $ref: "#/components/schemas/Order"
                        }
                    }
                },

                // ==========================================
                // DRIVER
                // ==========================================

                Driver: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6a748696461170fa143b24ff"
                        },
                        firstName: {
                            type: "string",
                            example: "Abelardo"
                        },
                        lastName: {
                            type: "string",
                            example: "Bernhard"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "driver@example.com"
                        },
                        role: {
                            type: "string",
                            example: "driver"
                        },
                        documents: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: []
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                // ==========================================
                // DELIVERY
                // ==========================================

                Delivery: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6a7a0aeb0d815c98539d9399"
                        },
                        order: {
                            type: "string",
                            example: "6a748696461170fa143b2519"
                        },
                        driver: {
                            type: "string",
                            example: "6a748696461170fa143b24ff"
                        },
                        status: {
                            type: "string",
                            enum: [
                                "created",
                                "assigned",
                                "picked_up",
                                "in_transit",
                                "delivered",
                                "cancelled"
                            ],
                            example: "created"
                        },
                        deliveredAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                            example: null
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                DeliveryPopulated: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6a7a0aeb0d815c98539d9399"
                        },
                        order: {
                            $ref: "#/components/schemas/Order"
                        },
                        driver: {
                            $ref: "#/components/schemas/Driver"
                        },
                        status: {
                            type: "string",
                            enum: [
                                "created",
                                "assigned",
                                "picked_up",
                                "in_transit",
                                "delivered",
                                "cancelled"
                            ],
                            example: "created"
                        },
                        deliveredAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                            example: null
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                DeliveryInput: {
                    type: "object",
                    required: [
                        "order",
                        "driver"
                    ],
                    properties: {
                        order: {
                            type: "string",
                            example: "6a748696461170fa143b2519"
                        },
                        driver: {
                            type: "string",
                            example: "6a748696461170fa143b24ff"
                        },
                        status: {
                            type: "string",
                            enum: [
                                "created",
                                "assigned",
                                "picked_up",
                                "in_transit",
                                "delivered",
                                "cancelled"
                            ],
                            example: "created"
                        }
                    }
                },

                DeliveryStatusInput: {
                    type: "object",
                    required: [
                        "status"
                    ],
                    properties: {
                        status: {
                            type: "string",
                            enum: [
                                "created",
                                "assigned",
                                "picked_up",
                                "in_transit",
                                "delivered",
                                "cancelled"
                            ],
                            example: "in_transit"
                        }
                    }
                },

                DeliveriesResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Lista de entregas"
                        },
                        payload: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Delivery"
                            }
                        }
                    }
                },

                DeliveryResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Obtener entrega por id"
                        },
                        payload: {
                            $ref: "#/components/schemas/DeliveryPopulated"
                        }
                    }
                },

                // ==========================================
                // RESPONSES
                // ==========================================

                SuccessResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Operación realizada correctamente"
                        },
                        payload: {
                            type: "object"
                        }
                    }
                },

                ErrorResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "error"
                        },
                        error: {
                            type: "string",
                            example: "USER_NOT_FOUND"
                        },
                        message: {
                            type: "string",
                            example: "Usuario no encontrado"
                        }
                    }
                },

                // ==========================================
                // MOCKS
                // ==========================================

                MockUsersResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Usuarios mock generados correctamente"
                        },
                        payload: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },

                MockOrdersResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Pedidos mock generados correctamente"
                        },
                        payload: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Order"
                            }
                        }
                    }
                },

                GenerateDataInput: {
                    type: "object",
                    properties: {
                        users: {
                            type: "integer",
                            minimum: 1,
                            example: 10
                        },
                        stores: {
                            type: "integer",
                            minimum: 1,
                            example: 5
                        },
                        orders: {
                            type: "integer",
                            minimum: 1,
                            example: 20
                        }
                    }
                },

                GenerateDataResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Datos de prueba generados correctamente"
                        },
                        payload: {
                            type: "object",
                            properties: {
                                users: {
                                    type: "integer",
                                    example: 10
                                },
                                stores: {
                                    type: "integer",
                                    example: 3
                                },
                                orders: {
                                    type: "integer",
                                    example: 20
                                },
                                deliveries: {
                                    type: "integer",
                                    example: 20
                                }
                            }
                        }
                    }
                },

                // ==========================================
                // LOGGER
                // ==========================================

                LoggerResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "success"
                        },
                        message: {
                            type: "string",
                            example: "Logger funcionando correctamente"
                        },
                        payload: {
                            type: "object",
                            properties: {
                                levels: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    },
                                    example: [
                                        "debug",
                                        "http",
                                        "info",
                                        "warning",
                                        "error",
                                        "fatal"
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    apis: [
        "./src/routes/*.js"
    ]
});