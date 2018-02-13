<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Users;
use App\Form\UserType;
use App\Form\ListView;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{   
    /**
     * @Route("/", name="home_page")
     */
    public function index()
    {   
        return $this->render('home.html.twig');
    }
     /**
     * @Route("/form", name="user_registration")
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {   
        $user = new Users();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $password =  $user->getPlainPassword();
            $user->setPassword($password);

            // ... perform some action, such as saving the task to the database
            // for example, if Task is a Doctrine entity, save it!
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('form');
        }


        return $this->render('newForm.html.twig', array(
            'form' => $form->createView(),
        ));
    }

    /**
    * @Route("/lists", name="users_show")
    */
     public function showAction()
    {   
        $listview = new ListView();
        $repository = $this->getDoctrine()->getRepository(Users::class);
        $user = $repository->findAll();

        return $this->render('list.html.twig', array(
            'users' => $user,
        ));

    }
        /**
    * @Route("/json/list", name="users_show")
    */
     public function jsonAction(Request $request)
    {   
        $response = new JsonResponse();
        $repository = $this->getDoctrine()
                ->getRepository(Users::class)
                ->findAll();
        $jsonData = array();  
        $idx = 0;  
      foreach($repository as $user) {  
         $temp = array(
            'id' => $user->getId(),
            'name' => $user->getName(),  
            'email' => $user->getEmail(),
            'gender' => $user->getGender(), 
            'description' => $user->getDescription(),   
         );   
         $jsonData[$idx++] = $temp;  
      } 
      return new JsonResponse($jsonData);  
    }
 /**
 * @Route("/users/delete/{id}")
 */
public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(Users::class)->find($id);

        $em->remove($user);
        $em->flush();
        return $this->redirectToRoute('list');
    }
/**
 * @Route("/users/edit/{id}")
 */
public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(Users::class)->find($id);

        $form = $this->createForm(UserType::class, $user);
        $user->setName($request->request->get('name'));
        $user->setEmail($request->request->get('email'));
        $user->setGender($request->request->get('gender'));
        $user->setDescription($request->request->get('description'));
        $em->persist($user);
        $em->flush();

        return $this->redirectToRoute('list');
    }
}

