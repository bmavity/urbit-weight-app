/-  *weight-app
/+  *server, default-agent, *weight-app-json

|%
+$  card  card:agent:gall
--
^-  agent:gall
=|  state=weight-app-state
=<
  |_  bol=bowl:gall
  +*  this       .
      weight-core  +>
      cc         ~(. weight-core bol)
      def        ~(. (default-agent this %|) bol)
  ::
  ++  on-init
    ^-  (quip card _this)
    :_  this(state [%0 current-weight=~])
    [[%pass / %arvo %e %connect [~ /'~weight-app'] %weight-app] ~]
  ::
  ++  on-save  !>(state)
  ::
  ++  on-load
    |=  old=vase
    ^-  (quip card _this)
    =/  loaded=weight-app-state
      !<(weight-app-state old)
    `this(state loaded)
  ::
  ++  on-poke
    |=  [=mark =vase]
    ^-  (quip card _this)
    ?>  (team:title our.bol src.bol)
    ?+    mark  (on-poke:def mark vase)
        %handle-http-request
      =+  !<([eyre-id=@ta =inbound-request:eyre] vase)
      :: ~&  [eyre-id inbound-request]
      :_  this
      %+  give-simple-payload:app  eyre-id
      %+  require-authorization:app  inbound-request
      poke-handle-http-request:cc
        %weight-app-action
      =/  action=weight-app-action  !<(weight-app-action vase)
      ?-  action
        [%add-weight weight=@ud]
      =/  new-state  ?-  -.state
        %0  :*
          %1
          [[weight=weight.action unit=%lbs] date=now.bol]
          ~
        ==
        %1  :*
          %1
          [[weight=weight.action unit=%lbs] date=now.bol]
          [current-weight.state past-weights.state]
        ==
      ==
      `this(state new-state)
    ==
    ::
    ==
  ::
  ++  on-agent
    |=  [=wire =sign:agent:gall]
    ^-  (quip card _this)
    ~&  [wire sign]
    `this
  ::
  ++  on-arvo
    |=  [=wire =sign-arvo]
    ^-  (quip card _this)
    ?.  ?=(%bound +<.sign-arvo)
      (on-arvo:def wire sign-arvo)
    [~ this]
  ::
  ++  on-watch
    |=  =path
    ^-  (quip card:agent:gall _this)
    ~&  path
    ?:  ?=([%http-response *] path)
      `this
    ?.  =(/ path)
      (on-watch:def path)
    [[%give %fact ~ %json !>((weight-app-state-to-json state))]~ this]
  ::
  ++  on-fail   on-fail:def
  ++  on-leave  on-leave:def
  ++  on-peek   on-peek:def
  --
::
::
|_  bol=bowl:gall
::
++  poke-handle-http-request
  |=  =inbound-request:eyre
  ^-  simple-payload:http
  =+  url=(parse-request-line url.request.inbound-request)
  ?+  site.url  not-found:gen
  ::
      [%'~weight-app' %state ~]  (json-response:gen (json-to-octs (weight-app-state-to-json state)))
  ==
::
--
