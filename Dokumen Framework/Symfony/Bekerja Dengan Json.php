<?php

namespace BelajarBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Json;
use Symfony\Component\HttpFoundation\Request;
class JsonController extends Controller
{
    public function json1Action()
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery("SELECT p FROM EntityBundle:Product p"); 
        $myArray = $query->getArrayResult();
		return new JsonResponse($myArray);  
    }
    public function json2Action()
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery("SELECT p FROM EntityBundle:Product p");
        $entities=$query->getResult();

        $template=$this->renderView('BelajarBundle:Json:index.html.twig',array('entities'=>$entities));
		return new JsonResponse(array('entities'=>$template),200);  
    }

    public function json3Action()
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery("SELECT p FROM EntityBundle:Product p");
        $entities=$query->getResult();

        $myArray=array();
        $myArray["id"]=array();
        $myArray["nama"]=array();
        $myArray["harga"]=array();
        $myArray["unitStock"]=array();
        
        foreach($entities as $entities)
        {
        	array_push($myArray["id"],$entities->getId());
        	array_push($myArray["nama"],$entities->getNama());
        	array_push($myArray["harga"],$entities->getHarga());
        	array_push($myArray["unitStock"],$entities->getUnitStock());

        }
       return new JsonResponse($myArray);  
    }
}
