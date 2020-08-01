$(document).ready(function(){
    $('#searchUser').on('keyup',function(e){
        let username = e.target.value;


        $.ajax({
            url: 'https://api.github.com/users/'+username,
            data: {
                client_id: '0acb63e143b623f6aa8e',
                client_secret: '8f7dd335105b5ab9b5418352f0fc485c558b7096'
            }
        }).done(function(user) {
            $.ajax({
                url: 'https://api.github.com/users/'+username+'/repos',
                data: {
                    client_id: '0acb63e143b623f6aa8e',
                    client_secret: '8f7dd335105b5ab9b5418352f0fc485c558b7096',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos,function(index,repo){
                    $('#repos').append(`
                    <div class="well">
                        <div class="row">
                            <div class="col-md-7">
                                <strong>${repo.name} </strong> : ${repo.description}
                            </div>
                            <div class="col-md-3">
                                <span class="badge badge-primary">Forkes : ${repo.forks_count}</span>
                                <span class="badge badge-secondary">Watch : ${repo.watcher_count}</span>
                                <span class="badge badge-success">Stars : ${repo.stargazer_count}</span>
                            
                            </div>
                            <div class="col-md-3">
                                <a href="${repo.html_url}" target"_blank" class="btn btn-info">Info</a>
                            </div>
                        </div>
                    </div>
                    `);
                })
            });
            $('#profile').html(`
            <div class="card">
            <div class="card-header">
              ${user.name}
            </div>
            <div class="card-body">
                <div class="row" >
                    <div class="col-md-3">
                        <img style="width:100%" class="thumbnail" src="${user.avatar_url}">
                        <br>
                        <a class="btn btn-primary" href="${user.html_url}">link profile</a>
                    </div>
                    <div class="col-md-9">
                    <span class="badge badge-primary">Public repos : ${user.public_repos}</span>
                    <span class="badge badge-secondary">Public gist : ${user.public_gists}</span>
                    <span class="badge badge-success">Public followers : ${user.followers}</span>
                    <span class="badge badge-danger">Public following : ${user.following}</span>
                    <br>
                    <br>
                    <ul class="list-group>
                        <li class="list-group-item">Company : ${user.company} </li>
                        <li class="list-group-item">Website : ${user.blog} </li>
                        <li class="list-group-item">Location : ${user.location} </li>
                        <li class="list-group-item">Since : ${user.created_at} </li>

                    </ul>
                    </div>
                </div>
            </div>
          </div>]

          <h3 class="page-header">Lastest Repo </h3>
          <div id="repos"> </div>
            `);
        })
    })
})


   // $('#profile').html(`
        //   ${user.name}
        // `);