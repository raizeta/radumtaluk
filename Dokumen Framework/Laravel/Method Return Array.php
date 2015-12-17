    <?php

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $author     = User::lists('name', 'id');
        $kategori   = Category::lists('namakategori', 'id');
        $data= array('author'=>$author,'kategori'=>$kategori);

        //return view('posts.new')->with($data);
        
        // hasilnya sama dengan code dibawah ini
        // return view('post.new',array('author'=>$author,'kategori'=>$kategori));
        // return view('posts.new',['author'=>$author,'kategori'=>$kategori]);
        // return view('posts.new')->with('author',$author)->with('kategori',$kategori);
        // return view('posts.new',compact('author','kategori'));
    }