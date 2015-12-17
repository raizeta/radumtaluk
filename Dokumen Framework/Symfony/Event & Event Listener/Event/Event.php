<?php
namespace TestBundle\Event;
use Symfony\Component\EventDispatcher\Event;

class RadumtaEvent extends Event
{
    protected $name;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function getName()
    {
        return $this->name;
    }
}