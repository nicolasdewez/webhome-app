<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class HomeController.
 */
class HomeController extends Controller
{
    /**
     * @return Response
     *
     * @Route("/", name="app_home", methods="GET")
     */
    public function indexAction()
    {
        return $this->render('home/index.html.twig');
    }
}
