<?php

namespace TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use TestBundle\Event\CustomerEvent;
use TestBundle\OOP\Customer;
use TestBundle\OOP\WelcomeEmail;
use Symfony\Component\HttpFoundation\Response;
class EventController extends Controller
{

    /**
     * @Template("TestBundle:Event:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('EntityBundle:Orders')->findOrdersAll();

        $html = $this->renderView('TestBundle:Event:index.html.twig');
        $pdfgenerator= $this->get('knp_snappy.pdf');
        $file = $pdfgenerator->getOutputFromHtml($html);
        
        $attachment = \Swift_Attachment::newInstance($file, 'my-file.pdf', 'application/pdf');

        $customer = new Customer();
        $customer->setName('Radumta Sitepu');
        $customer->setEmail('perjon_zet@ymail.com');

        $message = \Swift_Message::newInstance()
            ->setSubject('Hello Email')
            ->setFrom('raizetacorp@gmail.com')
            ->setTo('perjon_zet@ymail.com')
            ->setBody($this->renderView('TestBundle:Event:index.html.twig'))
            ->attach($attachment);

        $this->get('mailer')->send($message);

        return array();
    }

}
