services:
    customer.register:
       class: TestBundle\EventListener\RadumtaEventListener
       tags:
         - {name: kernel.event_listener, event:hkt.event.viewed, method:handler}