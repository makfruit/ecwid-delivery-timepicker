// Ecwid.getAppPublicConfig('my-cool-app')

ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

// Order pickup date/time. Datepicker configuration depends on pickup point
ec.order.extraFields.delivery_time = {
  //'title': '_msg_ShippingDetails.delivery.customer_header',
  'title': 'Delivery time',
  'required': true,
  'type': 'datetime',
  'checkoutDisplaySection': 'order_comments',
  'orderDetailsDisplaySection': 'order_comments',
  'datePickerOptions': {
    //minDate: new Date(new Date().getTime() + 2*60*60*1000), // Add order preparation (fulfillment) time
    //maxDate: new Date(2020, 12, 31),
    showTime: true,
    autoClose: false,
    //use24hour: true,
    incrementMinuteBy: 60,
    limitAvailableHoursWeekly: {
      'MON': [
        ['08:30', '13:30'],
        ['14:00', '17:30']
      ],
      'TUE': [
        ['14:00', '17:30']
      ],
      'WED': [
        ['01:00', '13:30']
      ],
      'THU': [
        ['14:00', '23:30']
      ],
      'FRI': [
        ['14:00', '17:30']
      ]
    }
  },

  'overrides': [
    {
      'conditions': {
        'shippingMethod': 'Local Delivery1'
      },
      'fieldsToOverride': {
        'datePickerOptions': {
          minDate: new Date(new Date().getTime() + 2*60*60*1000),
          maxDate: new Date(2020, 12, 31),
          showTime: true,
          autoClose: false,
          use24hour: true,
          incrementMinuteBy: 30,
          limitAvailableHoursWeekly: {
            'MON': [
              ['08:30', '13:30'],
              ['14:00', '17:30']
            ],
            'TUE': [
              ['14:00', '17:30']
            ]
          },

          // Disallow specific dates
          'disallowDates': [
            // Disallow same-day pickup after 3PM
            ['2017-04-25 15:00:00', '2017-04-25 23:59:59'],

            // Disallow specific time interval (e.g. if you're booked at that time)
            ['2017-04-26 08:30', '2017-04-26 10:00']
          ]
        }
      }
    },

    {
      'conditions': {
        'shippingMethod': 'Pickup at East st'
      },
      'fieldsToOverride': {
        'datePickerOptions': {
          minDate: new Date(new Date().getTime() + 2*60*60*1000),
          maxDate: new Date(2020, 12, 31),
          showTime: true,
          autoClose: false,
          use24hour: true,
          incrementMinuteBy: 30,
          limitAvailableHoursWeekly: {
            SAT: [
              ['08:30', '13:30'],
              ['14:00', '17:30']
            ],
            SUN: [
              ['14:00', '17:30']
            ]
          }
        }
      }
    },

    {
      'conditions': {
        'shippingMethod': 'Local Delivery'
      },
      'fieldsToOverride': {
        //'available': false
      }
    }
  ]
};