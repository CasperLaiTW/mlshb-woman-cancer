@section('main')
    <div ng-controller="analyticsCtrl" ng-init="init()">
        <div class="jumbotron">
            <h1>名單分析</h1>
            <div class="form-group">
                <label for="source">
                    <input type="file" id="source" accept=".txt,.csv">
                    請選擇名單
                </label>
            </div>
            <button type="button" class="btn btn-primary" ng-click="analytics();">開始分析</button>
        </div>

        <div class="result">
            <h6 class="page-header">鄉鎮設站篩檢場次及成果分析</h6>
            <table class="table table-bordered small">
                <thead>
                    <tr>
                        <th></th>
                        <th colspan="13">設站場次</th>
                        <th colspan="13">子抹篩檢人數</th>
                        <th colspan="13">乳攝篩檢人數</th>
                        <th colspan="13">四癌宣導講座場次</th>
                        <th colspan="24">宣導講座參加人數</th>
                        <th rowspan="2">搭配癌症篩檢職場場數</th>
                        <th rowspan="2">子抹人數</th>
                        <th rowspan="2">乳攝人數</th>
                    </tr>
                    <tr>
                        <td>鄉鎮</td>
                        @for($i = 0; $i < 4; $i++)
                            @for($j = 1; $j <= 12; $j++)
                                <td>{{ $j }}月</td>
                            @endfor
                            <td>總計</td>
                        @endfor
                        @for($i = 1; $i <= 12; $i++)
                            <td>{{ $i }}女</td>
                            <td>{{ $i }}男</td>
                        @endfor
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="(key, value) in reports">
                        <td><% value.name %></td>
                        <td ng-repeat="(key2, value2) in value.data">
                        <% value2.count.count %>
                        </td>
                        <td><% total(value.data, 'count', 'count') %></td>

                        <td ng-repeat="(key2, value2) in value.data">
                            <% value2.cervix.count %>
                        </td>
                        <td><% total(value.data, 'cervix', 'count') %></td>

                        <td ng-repeat="(key2, value2) in value.data">
                            <% value2.breast.count %>
                        </td>
                        <td><% total(value.data, 'breast', 'count') %></td>

                        <td ng-repeat="(key2, value2) in value.data">
                            <% value2.lecture.count %>
                        </td>
                        <td><% total(value.data, 'lecture', 'count') %></td>
                        <td ng-repeat-start="(key2, value2) in value.data">
                            <% value2.community.female%>
                        </td>
                        <td ng-repeat-end>
                            <% value2.community.man%>
                        </td>
                        <td><% total(value2, 'work', 'count') %></td>
                        <td><% total(value2, 'work', 'man') %></td>
                        <td><% total(value2, 'work', 'female') %></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
@stop

@section('scripts')
    {{ HTML::script('/scripts/app.js') }}
    {{ HTML::script('/scripts/home.js') }}
@stop