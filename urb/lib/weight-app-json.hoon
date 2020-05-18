/-  *weight-app

|%
  ++  weight-app-state-to-json
    |=  state=weight-app-state
    ^-  json
    ?-  -.state
      %0  (initial-state-to-json state)
      %1  (state-1-to-json state)
    ==
  ++  initial-state-to-json
    |=  state=weight-app-initial-state
    ^-  json
    %-  pairs:enjs:format
    :~  ['current-weight' ~]
        ['past-weights' [%a ~]]
    ==
  ++  state-1-to-json
    |=  state=weight-app-state-1
    ^-  json
    %-  pairs:enjs:format
    :~  ['current-weight' (weight-entry-to-json current-weight.state)]
        ['past-weights' [%a (turn past-weights.state weight-entry-to-json)]]
    ==
  ++  weight-entry-to-json
    |=  =weight-entry
    ^-  json
    ~&  value.weight.weight-entry
    %-  pairs:enjs:format
    :~  'value'^(numb:enjs:format value.weight.weight-entry)
        'unit'^s+unit.weight.weight-entry
        'date'^(time:enjs:format date.weight-entry)
    ==
--
