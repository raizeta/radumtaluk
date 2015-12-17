<?php

namespace TestBundle\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use TestBundle\Event\RadumtaEvent;

class RadumtaEventListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return array('hkt.event.page_viewed' => 'handler');
    }

    public function handler(PageViewed $event)
    {
        // $event->getName();
        // do what you want with the event
    }
}