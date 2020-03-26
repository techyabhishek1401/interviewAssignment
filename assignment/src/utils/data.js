
//test data
export const airports = [
    {
        "airport_id": "airport_1",
        "airport_name": "Indira Gandhi International Airport,Delhi",
        "fuel_capacity": 600000,
        "fuel_available": 599999,
        "transactions": [
            {
                "transaction_id": "kkk",
                "transaction_date_time": "2020-03-25T17:47:04.349Z",
                "transaction_type": "IN",
                "airport_id": "airport_1",
                "aircraft_id": "aircraft_1",
                "quantity": "",
                "transaction_id_parent": ""
            },
            {
                "transaction_id": "jjj",
                "transaction_date_time": "2020-03-25T17:47:28.646Z",
                "transaction_type": "IN",
                "airport_id": "airport_1",
                "aircraft_id": "aircraft_1",
                "quantity": "1",
                "transaction_id_parent": ""
            }
        ]
    },
    {
        "airport_id": "airport_2",
        "airport_name": "Rajiv Gandhi International Airport, Hyderabad ",
        "fuel_capacity": 600000,
        "fuel_available": 543668,
        "transactions": [
            {
                "transaction_id": "transaction_46",
                "transaction_date_time": "2020-03-25T14:07:50.474Z",
                "transaction_type": "IN",
                "airport_id": "airport_2",
                "aircraft_id": "aircraft_4",
                "quantity": "9999",
                "transaction_id_parent": ""
            },
            {
                "transaction_id": "transaction_113",
                "transaction_date_time": "2020-03-25T14:23:31.899Z",
                "transaction_type": "IN",
                "airport_id": "airport_2",
                "aircraft_id": "aircraft_6",
                "quantity": "344",
                "transaction_id_parent": ""
            },
            {
                "transaction_id": "transaction_113",
                "transaction_date_time": "2020-03-25T14:23:31.899Z",
                "transaction_type": "OUT",
                "airport_id": "airport_2",
                "aircraft_id": "aircraft_6",
                "quantity": "-344",
                "transaction_id_parent": "transaction_113"
            },
            {
                "transaction_id": "transaction_122",
                "transaction_date_time": "2020-03-25T14:53:37.487Z",
                "transaction_type": "IN",
                "airport_id": "airport_2",
                "aircraft_id": "",
                "quantity": "33333",
                "transaction_id_parent": ""
            }
        ]
    },
    {
        "airport_id": "airport_3",
        "airport_name": "Chhatrapati Shivaji International Airport, Mumbai ",
        "fuel_capacity": 600000,
        "fuel_available": 469410,
        "transactions": [
            {
                "transaction_id": "transaction_47",
                "transaction_date_time": "2020-03-25T14:07:50.474Z",
                "transaction_type": "IN",
                "airport_id": "airport_3",
                "aircraft_id": "aircraft_5",
                "quantity": "99990",
                "transaction_id_parent": ""
            },
            {
                "transaction_id": "transaction_200",
                "transaction_date_time": "2020-03-25T17:13:23.469Z",
                "transaction_type": "IN",
                "airport_id": "airport_3",
                "aircraft_id": "aircraft_8",
                "quantity": "34000",
                "transaction_id_parent": ""
            },
            {
                "transaction_id": "transaction_200",
                "transaction_date_time": "2020-03-25T17:13:23.469Z",
                "transaction_type": "OUT",
                "airport_id": "airport_3",
                "aircraft_id": "aircraft_8",
                "quantity": "-3400",
                "transaction_id_parent": "transaction_200"
            }
        ]
    },
    {
        "airport_id": "airport_4",
        "airport_name": "Chennai International Airport, Chennai ",
        "fuel_capacity": 600000,
        "fuel_available": 577000
    },
    {
        "airport_id": "airport_5",
        "airport_name": "Kempegowda International Airport, Bangalore ",
        "fuel_capacity": 600000,
        "fuel_available": 577000,
        "transactions": [
            {
                "transaction_id": "transaction_133",
                "transaction_date_time": "2020-03-25T17:31:22.189Z",
                "transaction_type": "IN",
                "airport_id": "airport_5",
                "aircraft_id": "aircraft_5",
                "quantity": "23000",
                "transaction_id_parent": ""
            },
            {
                "transaction_id": "transaction_1334",
                "transaction_date_time": "2020-03-25T18:51:35.664Z",
                "transaction_type": "IN",
                "airport_id": "airport_5",
                "aircraft_id": "aircraft_6",
                "quantity": "233",
                "transaction_id_parent": ""
            },
            {
                "transaction_id": "transaction_1334_2",
                "transaction_date_time": "2020-03-25T18:51:35.664Z",
                "transaction_type": "OUT",
                "airport_id": "airport_5",
                "aircraft_id": "aircraft_6",
                "quantity": "-233",
                "transaction_id_parent": "transaction_1334"
            }
        ]
    },
    {
        "airport_id": "airport_6",
        "airport_name": "testAirport",
        "fuel_capacity": 600000,
        "fuel_available": 600000
    },
    {
        "airport_id": "airport_7",
        "airport_name": "00Abhishek",
        "fuel_capacity": 600000,
        "fuel_available": 600000
    }
]

export const aircrafts = [
    {
        "aircraft_id": "aircraft_1",
        "aircraft_no": "6E-292",
        "airline": "IndiGo",
        "source": "CHENNAI",
        "destination": "GUWAHATI"
    },
    {
        "aircraft_id": "aircraft_2",
        "aircraft_no": "G8-321",
        "airline": "Go Air",
        "source": "MUMBAI",
        "destination": "BENGALOORU"
    },
    {
        "aircraft_id": "aircraft_3",
        "aircraft_no": "SG-1084",
        "airline": "Spice Jet",
        "source": "TUTICORIN",
        "destination": "CHENNAI"
    },
    {
        "aircraft_id": "aircraft_4",
        "aircraft_no": "AI9730",
        "airline": "Air India",
        "source": "GUWAHATI",
        "destination": "KOLKATA"
    },
    {
        "aircraft_id": "aircraft_5",
        "aircraft_no": "LB693",
        "airline": "AirCosta",
        "source": "BENGALOORU",
        "destination": "HYDERABAD"
    },
    {
        "aircraft_id": "aircraft_6",
        "aircraft_no": "AB001",
        "airline": "Spice Jet",
        "source": "Etawah",
        "destination": "Delhi"
    },
    {
        "aircraft_id": "aircraft_7",
        "aircraft_no": "7F-330",
        "airline": "Air India",
        "source": "Etawah",
        "destination": "Delhi"
    },
    {
        "aircraft_id": "aircraft_8",
        "aircraft_no": "HLMN",
        "airline": "",
        "source": "Delhi",
        "destination": "Bangalore"
    },
    {
        "aircraft_id": "aircraft_9",
        "aircraft_no": "00No-2",
        "airline": "Spice Jet",
        "source": "Noida",
        "destination": "Delhi"
    },
    {
        "aircraft_id": "aircraft_80",
        "aircraft_no": "56F-330",
        "airline": "IndiGo",
        "source": "kanpur",
        "destination": "noida"
    }
]
