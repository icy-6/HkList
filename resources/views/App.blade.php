@php
    try {
        echo \Illuminate\Support\Facades\File::get(public_path('index.html'));
    }catch (Exception $e){
        echo '未获取到页面内容,请检查public目录下是否存在编译后的前端项目!!!';
    }
@endphp

{{--插入自定义脚本--}}
@if(config("hklist.general.custom_script") !== "")
    <script>
        {!! config("hklist.general.custom_script") !!}
    </script>
@endif