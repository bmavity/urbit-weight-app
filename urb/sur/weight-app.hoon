|%
+$  weight-app-action
  $%
     [%add-weight weight=@ud]
  ==
+$  weight-unit  ?(%kg %lbs)
+$  weight  [value=@ud unit=weight-unit]
+$  weight-entry  [=weight date=@da]
+$  weight-app-initial-state  [%0 current-weight=~]
+$  weight-app-state-1  [%1 current-weight=weight-entry past-weights=(list weight-entry)]
+$  weight-app-state
  $%
    weight-app-initial-state
    weight-app-state-1
  ==
--
