

var axios = require("axios");
var fs = require("fs");
var readline = require("readline-sync");

fs.exists(__dirname + "/courses.json",(exists)=>{
    if(!exists){
        axios.get("http://saral.navgurukul.org/api/courses")
        .then(function (response){
            var mydata = response.data
            // console.log(mydata)
            var data1 = JSON.stringify(mydata)
            var data2 = fs.writeFileSync("courses.json",data1);
            // console.log(data2)
        })
        .catch(function(error){
            console.log(error.response.status);
        })
    }else{
        var data2 = fs.readFileSync('courses.json')
        var coursesdata = JSON.parse(data2)
        // console.log(coursesdata.availableCourses);
        var course = coursesdata.availableCourses 
        
        var list_of_id = [];
        var number = 0;
        for (i of course){
            console.log(number,i.name);
            // console.log(i.id);
            list_of_id.push(i.id);
            number+=1;

        }
        // console.log(list_of_id);
    }
    var user = readline.question("\n\nChoose your course id:-");
    for (var i in list_of_id){
        // console.log(i)
        if(i == user){
            // console.log(list_of_id[i]);
            var id = (list_of_id[i]);            
            axios.get("http://saral.navgurukul.org/api/courses/"+id+"/exercises")
            .then (function (response){
                var datalink = response.data
                // console.log(datalink.data);
                var mydatalink = datalink.data;
                var number1 = 0;
                slug_list = [];
                nubmer_list = [];
                for ( j of mydatalink){
                    // console.log(j.slug)
                    var slug = (j.slug)
                    console.log(number1,j.name);
                    ChildExercises = (number,j.childExercises);
                    slug_list.push(slug);
                    // console.log(slug_list);
                    nubmer_list.push(number1);
                    number2 = 0.1;
                    for (k of ChildExercises){
                        var n = number1+number2;
                        console.log('   ',n,k.name);
                        slug_list.push(k.slug);                     
                        nubmer_list.push(n);                     
                        number2 += 0.1;                     
                    }
                    number1+=1
            
                }
                console.log("\n------------------------sahi khel raha hai bhai tu----------------------\n")
                
                var user_5 = readline.question("input your course content number:-");
                for (l in nubmer_list){
                    if(nubmer_list[l] == user_5){
                        var slug = (slug_list[l]);                                         
                        axios.get("http://saral.navgurukul.org/api/courses/"+id+"/exercise/getBySlug?slug="+slug)
                        .then (function (response){
                            var content = response.data;
                            console.log(content.content);
                        });
                    }
                } 
                
            })
        }
        
    }

});


