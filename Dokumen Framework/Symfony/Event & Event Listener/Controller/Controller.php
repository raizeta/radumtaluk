<?php

namespace TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use TestBundle\Event\RadumtaEvent;
class EventController extends Controller
{

    /**
     * @Template("TestBundle:Event:index.html.twig")
     */
    public function indexAction($name)
    {
        
        $event = new RadumtaEvent($name);
        $dispatcher = $this->get('event_dispatcher');
        $dispatcher->dispatch('hkt.event.page_viewed',$event);
        #$this->get('event_dispatcher')->dispatch('hkt.event.page_viewed', $event);
        return array('name' => $name);
    }

}
